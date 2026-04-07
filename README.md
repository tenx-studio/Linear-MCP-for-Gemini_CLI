# 🚀 Gemini Linear MCP

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Model Context Protocol](https://img.shields.io/badge/MCP-Protocol-orange.svg)](https://modelcontextprotocol.io/)

A powerful, open-source **Model Context Protocol (MCP)** server specifically built to bridge **Gemini CLI** directly to your **Linear** workspace. Manage issues, teams, and workflows seamlessly through natural language, right from your terminal.

---

## 🌟 Features

- **🔍 Search & Discovery:** Find issues across your entire workspace directly from Gemini CLI.
- **📝 Issue Management:** Fetch, create, and update issues (status, priority, assignee, etc.) effortlessly.
- **💬 Collaboration:** Add comments to issues without leaving your terminal.
- **🏢 Workspace Insights:** List teams, users, and workflow states to provide full context to Gemini.
- **⚡ Real-time Integration:** Built on the Model Context Protocol for low-latency, secure communication.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js:** Version 18.0.0 or higher.
- **Gemini CLI:** Installed and configured on your machine.
- **Linear Account:** With access to generate an API key.

---

## 📖 Complete Gemini CLI Integration Guide

This server is written in TypeScript. Because Gemini CLI requires a standard JavaScript executable to run MCP servers, we first need to download and "build" the project. 

Follow these 4 steps to get everything connected.

### Step 1: Download & Build the Server

1. **Clone the repository to your machine:**
   ```bash
   git clone https://github.com/tenx-studio/Linear-MCP.git
   cd linear-mcp-open-source
   ```

2. **Install the required packages:**
   ```bash
   npm install
   ```

3. **Compile the code:**
   ```bash
   npm run build
   ```
   *(Why do this? This command translates the TypeScript code into a `dist/index.js` file, which is the exact file Gemini CLI will use to communicate with Linear).*

### Step 2: Get your Linear API Key

1. Navigate to **Settings > API > Personal API keys** in your Linear workspace.
2. Click **New API key** and give it a descriptive name (e.g., "Gemini CLI").
3. **Copy the key** (you will need it for the final step).

### Step 3: Connect to Gemini CLI

Now we tell Gemini CLI where to find the built server and securely provide it with your API key.

1. Open your Gemini CLI settings file. You can usually find it at:
   - **Windows:** `%USERPROFILE%\.gemini\settings.json` (e.g., `C:\Users\YourName\.gemini\settings.json`)
   - **Mac/Linux:** `~/.gemini/settings.json`

2. Add the `mcp` configuration block to the file so it looks like this:

```json
{
  "mcp": {
    "servers": {
      "linear": {
        "command": "node",
        "args": ["/ABSOLUTE/PATH/TO/linear-mcp-open-source/dist/index.js"],
        "env": {
          "LINEAR_API_KEY": "lin_api_your_key_here"
        }
      }
    }
  }
}
```

⚠️ **Crucial Adjustments:**
- **`args`**: You MUST replace `/ABSOLUTE/PATH/TO/...` with the actual, full path on your computer where you cloned this repository. (e.g., `"D:/Projects/linear-mcp-open-source/dist/index.js"`).
- **`LINEAR_API_KEY`**: Replace `lin_api_your_key_here` with the exact API key you copied in Step 2.

### Step 4: Start Chatting!

Close and reopen your terminal to restart your Gemini CLI session. The integration is now active! 

Try asking Gemini CLI things like:
> *"List my Linear teams."*
> *"Find the issue about the login bug."*
> *"Create a new high priority issue in the Engineering team to update the README."*

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

Built with ❤️ for the AI Developer Community.