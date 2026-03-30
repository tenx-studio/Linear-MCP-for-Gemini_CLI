# Linear MCP Server

This is an open-source [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for interacting with the [Linear API](https://linear.app/docs/api).

## Features

- **Get Issues:** Fetch issues from a specific team.
- **Search Issues:** Search for issues across the workspace.
- **Create Issue:** Create new issues in a specific team.
- **Update Issue:** Update issue details (status, priority, assignee, etc.).
- **Add Comment:** Add comments to issues.
- **List Teams, Users, and Workflow States.**

## Prerequisites

- Node.js (v18 or higher)
- A Linear API Key

## Getting Your Linear API Key (Keep it Private!)

1. Go to your Linear workspace settings: **Settings > API > Personal API keys**.
2. Click **New API key** and give it a name (e.g., "MCP Server").
3. **Copy the key immediately.** You will not be able to see it again.

**IMPORTANT:** Never commit your actual API key to version control. This project uses an environment variable (`LINEAR_API_KEY`) to keep your key secure.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd linear-mcp-open-source
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy the `.env.example` file to create a new `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and replace `your_linear_api_key_here` with your actual Linear API key:
     ```
     LINEAR_API_KEY=lin_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```
   *Note: The `.env` file is included in `.gitignore`, so it will not be committed to Git.*

4. **Build the project:**
   ```bash
   npm run build
   ```

## Usage

You can start the server manually using:

```bash
npm start
```

Or configure your MCP client (like Gemini CLI, Claude Desktop, or Cursor) to spawn this server by pointing it to the compiled `dist/index.js` file and passing the `LINEAR_API_KEY` in the environment.

### Example configuration for an MCP client:
```json
{
  "mcpServers": {
    "linear": {
      "command": "node",
      "args": ["/path/to/linear-mcp-open-source/dist/index.js"],
      "env": {
        "LINEAR_API_KEY": "your_linear_api_key_here"
      }
    }
  }
}
```

## License

ISC
