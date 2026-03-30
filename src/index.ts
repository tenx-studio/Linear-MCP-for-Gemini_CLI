#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { LinearClient } from "@linear/sdk";

const apiKey = process.env.LINEAR_API_KEY;
if (!apiKey) {
  console.error("LINEAR_API_KEY environment variable is required.");
  process.exit(1);
}

const linear = new LinearClient({ apiKey });

const server = new Server(
  {
    name: "linear-custom",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "linear_get_issues",
        description: "Get issues from a specific team",
        inputSchema: {
          type: "object",
          properties: {
            teamKey: { type: "string", description: "The key of the team (e.g., ENG, DES)" },
            limit: { type: "number", description: "Maximum number of issues to return", default: 10 }
          }
        }
      },
      {
        name: "linear_search_issues",
        description: "Search for issues using a query",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "The search query" },
            limit: { type: "number", description: "Maximum number of results to return", default: 10 }
          },
          required: ["query"]
        }
      },
      {
        name: "linear_create_issue",
        description: "Create a new issue in a team",
        inputSchema: {
          type: "object",
          properties: {
            teamId: { type: "string", description: "The ID of the team to create the issue in" },
            title: { type: "string", description: "The title of the issue" },
            description: { type: "string", description: "The description of the issue" }
          },
          required: ["teamId", "title"]
        }
      },
      {
        name: "linear_update_issue",
        description: "Update an existing issue",
        inputSchema: {
          type: "object",
          properties: {
            issueId: { type: "string", description: "The ID or key (e.g., TEN-1) of the issue" },
            title: { type: "string" },
            description: { type: "string" },
            stateId: { type: "string", description: "The ID of the workflow state (e.g., In Progress)" },
            priority: { type: "number", description: "Priority (0-4)" },
            assigneeId: { type: "string", description: "The ID of the user to assign the issue to" }
          },
          required: ["issueId"]
        }
      },
      {
        name: "linear_add_comment",
        description: "Add a comment to an issue",
        inputSchema: {
          type: "object",
          properties: {
            issueId: { type: "string", description: "The ID or key of the issue" },
            body: { type: "string", description: "The content of the comment" }
          },
          required: ["issueId", "body"]
        }
      },
      {
        name: "linear_get_teams",
        description: "List all teams in the workspace",
        inputSchema: {
          type: "object",
          properties: {
            limit: { type: "number", default: 10 }
          }
        }
      },
      {
        name: "linear_get_users",
        description: "List all users in the workspace",
        inputSchema: {
          type: "object",
          properties: {
            limit: { type: "number", default: 10 }
          }
        }
      },
      {
        name: "linear_get_workflow_states",
        description: "Get workflow states for a specific team",
        inputSchema: {
          type: "object",
          properties: {
            teamId: { type: "string", description: "The ID of the team" }
          },
          required: ["teamId"]
        }
      }
    ]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case "linear_get_issues": {
        const { teamKey, limit = 10 } = request.params.arguments as any;
        const issues = teamKey 
          ? await linear.issues({ filter: { team: { key: { eq: teamKey } } }, first: limit })
          : await linear.issues({ first: limit });
        return { content: [{ type: "text", text: JSON.stringify(issues.nodes, null, 2) }] };
      }

      case "linear_search_issues": {
        const { query, limit = 10 } = request.params.arguments as any;
        const results = await linear.issueSearch({ query, first: limit });
        return { content: [{ type: "text", text: JSON.stringify(results.nodes, null, 2) }] };
      }

      case "linear_create_issue": {
        const { teamId, title, description } = request.params.arguments as any;
        const response = await linear.createIssue({ teamId, title, description });
        const issue = await response.issue;
        return { content: [{ type: "text", text: JSON.stringify(issue, null, 2) }] };
      }

      case "linear_update_issue": {
        const { issueId, ...updates } = request.params.arguments as any;
        const response = await linear.updateIssue(issueId, updates);
        const issue = await response.issue;
        return { content: [{ type: "text", text: JSON.stringify(issue, null, 2) }] };
      }

      case "linear_add_comment": {
        const { issueId, body } = request.params.arguments as any;
        const response = await linear.createComment({ issueId, body });
        const comment = await response.comment;
        return { content: [{ type: "text", text: JSON.stringify(comment, null, 2) }] };
      }

      case "linear_get_teams": {
        const { limit = 10 } = request.params.arguments as any;
        const teams = await linear.teams({ first: limit });
        return { content: [{ type: "text", text: JSON.stringify(teams.nodes, null, 2) }] };
      }

      case "linear_get_users": {
        const { limit = 10 } = request.params.arguments as any;
        const users = await linear.users({ first: limit });
        return { content: [{ type: "text", text: JSON.stringify(users.nodes, null, 2) }] };
      }

      case "linear_get_workflow_states": {
        const { teamId } = request.params.arguments as any;
        const team = await linear.team(teamId);
        const states = await team.states();
        return { content: [{ type: "text", text: JSON.stringify(states.nodes, null, 2) }] };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
    }
  } catch (e: any) {
    if (e instanceof McpError) throw e;
    throw new McpError(ErrorCode.InternalError, e.message);
  }
});

// Start the server
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Linear Custom MCP Server running on stdio");
}

run().catch(console.error);