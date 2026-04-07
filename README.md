# 🚀 Linear MCP Server

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Model Context Protocol](https://img.shields.io/badge/MCP-Protocol-orange.svg)](https://modelcontextprotocol.io/)

A powerful, open-source **Model Context Protocol (MCP)** server that bridges your favorite AI assistants (like Claude, Gemini, or Cursor) directly to your **Linear** workspace. Manage issues, teams, and workflows seamlessly through natural language.

---

## 🌟 Features

- **🔍 Search & Discovery:** Find issues across your entire workspace with powerful search capabilities.
- **📝 Issue Management:** Fetch, create, and update issues (status, priority, assignee, etc.) effortlessly.
- **💬 Collaboration:** Add comments to issues directly from your AI assistant's interface.
- **🏢 Workspace Insights:** List teams, users, and workflow states to provide full context to your AI.
- **⚡ Real-time Integration:** Built on the Model Context Protocol for low-latency, secure communication.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** Version 18.0.0 or higher.
- **Linear API Key:** A personal API key from your Linear workspace.

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/tenx-studio/Linear-MCP.git
cd linear-mcp-open-source
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory by copying the example:
```bash
cp .env.example .env
```
Edit the `.env` file and add your Linear API key:
```env
LINEAR_API_KEY=lin_api_your_key_here
```

### 4. Build the Project
```bash
npm run build
```

---

## 🛠️ Usage

### Manual Start
To run the server manually for testing or debugging:
```bash
npm start
```

### MCP Client Configuration
To use this server with an MCP-compatible client (e.g., Claude Desktop, Gemini CLI, or Cursor), add the following to your configuration file (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "linear": {
      "command": "node",
      "args": ["D:/Gemini CLi/linear-mcp-open-source/dist/index.js"],
      "env": {
        "LINEAR_API_KEY": "your_linear_api_key_here"
      }
    }
  }
}
```

---

## 🔑 Getting Your Linear API Key

1. Navigate to **Settings > API > Personal API keys** in your Linear workspace.
2. Click **New API key** and give it a descriptive name (e.g., "Local MCP Server").
3. **Copy the key immediately**—it will not be displayed again for security reasons.

> [!IMPORTANT]
> Never share your API key or commit it to version control. The `.env` file is automatically ignored by Git to keep your credentials secure.

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
