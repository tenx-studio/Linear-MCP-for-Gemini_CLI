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
- **Linear API Key:** A personal API key from your Linear workspace.
- **Gemini CLI:** Installed and configured on your machine.

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

## 🛠️ Gemini CLI Integration

To integrate this server with **Gemini CLI**, you need to add it to your Gemini CLI `settings.json` file. This file is typically located at `~/.gemini/settings.json` (or `%USERPROFILE%\.gemini\settings.json` on Windows).

Add the following configuration to your `mcp` block:

```json
{
  "mcp": {
    "servers": {
      "linear": {
        "command": "node",
        "args": ["D:/Gemini CLi/linear-mcp-open-source/dist/index.js"],
        "env": {
          "LINEAR_API_KEY": "your_linear_api_key_here"
        }
      }
    }
  }
}
```
*Note: Ensure the `args` path points to the absolute path of the `dist/index.js` file on your system, and replace `your_linear_api_key_here` with your actual key.*

---

## 🔑 Getting Your Linear API Key

1. Navigate to **Settings > API > Personal API keys** in your Linear workspace.
2. Click **New API key** and give it a descriptive name (e.g., "Gemini CLI MCP").
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