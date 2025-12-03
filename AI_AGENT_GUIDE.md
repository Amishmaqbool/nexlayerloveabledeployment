# AI Agent Integration Guide for Nexlayer

This guide explains how AI agents (Lovable, Replit, etc.) can automatically detect and deploy to Nexlayer.

## 🎯 Purpose

Enable AI agents to:
- Auto-detect Nexlayer deployment configuration
- Generate `nexlayer.yaml` automatically
- Deploy applications without manual intervention
- Retrieve deployment URLs and status

## 📁 Files Overview

### 1. `nexlayer-mcp.json`
**Purpose**: Makes Nexlayer appear as a native MCP (Model Context Protocol) tool to AI agents.

**What it does**:
- Defines Nexlayer as an MCP tool
- Exposes `deploy` and `logs` functions
- Allows AI agents to call deployment functions directly

**Usage**: AI agents automatically discover this file and integrate Nexlayer tools.

### 2. `nexlayer.config.stub`
**Purpose**: Hints to Lovable that Nexlayer is configured, triggering auto-generation of `nexlayer.yaml`.

**What it does**:
- Simple hint file that triggers YAML generation
- Lovable detects this and creates the full `nexlayer.yaml`

**Usage**: Place in repo root, Lovable will detect and scaffold the full config.

### 3. `.well-known/ai-plugin.json`
**Purpose**: Standard AI plugin manifest that makes ChatGPT, Lovable, Replit recognize Nexlayer.

**What it does**:
- Follows OpenAI plugin standard
- Makes Nexlayer discoverable by AI agents
- Links to OpenAPI specification

**Usage**: AI agents automatically read this directory for plugin discovery.

### 4. `openapi.yaml`
**Purpose**: Describes Nexlayer's API so AI agents can understand and generate client code.

**What it does**:
- Defines API endpoints (`/deploy`, `/logs`, `/status`)
- Describes request/response schemas
- Enables auto-generated client code

**Usage**: AI agents use this to understand how to interact with Nexlayer.

### 5. `.ai/context/nexlayer-deployment.md`
**Purpose**: Provides context and guidance for AI agents about the deployment setup.

**What it does**:
- Explains the deployment flow
- Documents key files
- Provides instructions for AI agents

**Usage**: AI agents can read this for context when deploying.

## 🚀 Test Prompts for AI Agents

### For Lovable:

**Prompt 1 - YAML Generation:**
```
Can you detect any deployment configuration in this repo and generate a nexlayer.yaml based on it?
```

**Prompt 2 - MCP Integration:**
```
There is an MCP manifest in the repo (nexlayer-mcp.json). Can you integrate this as an agent tool so the project can deploy to Nexlayer?
```

**Prompt 3 - Auto-Discovery:**
```
I added a Nexlayer URL in the project. Can you configure the full deployment pipeline?
```

### For Replit:

**Prompt 1:**
```
Can you scaffold a Nexlayer deployment file using the hints in the repository?
```

**Prompt 2:**
```
Please consume the openapi.yaml and generate Nexlayer client bindings.
```

## 🔄 How It Works

1. **Discovery Phase**:
   - AI agent scans repository
   - Finds `.well-known/ai-plugin.json`
   - Reads `nexlayer-mcp.json`
   - Detects `nexlayer.config.stub`

2. **Configuration Phase**:
   - Agent generates `nexlayer.yaml` based on project structure
   - Reads `Dockerfile` to understand container setup
   - Checks GitHub Actions workflow for deployment process

3. **Deployment Phase**:
   - Agent uses MCP tools to deploy
   - Or calls API endpoints defined in `openapi.yaml`
   - Monitors deployment status

4. **Retrieval Phase**:
   - Agent fetches deployment URL
   - Can display in UI (Lovable/Replit interface)
   - Updates deployment status component

## 🎨 Integration with Existing Setup

This integrates with your existing:
- ✅ GitHub Actions workflow (`.github/workflows/deploy-nexlayer.yml`)
- ✅ Dockerfile (container image)
- ✅ `nexlayer.yaml` (deployment config)
- ✅ `DeploymentStatus` React component

## 📋 Repository Structure

```
/
├─ .github/
│  └─ workflows/
│     └─ deploy-nexlayer.yml      # Existing CI/CD
├─ .well-known/
│  └─ ai-plugin.json              # AI plugin manifest
├─ .ai/
│  └─ context/
│     └─ nexlayer-deployment.md   # AI context guide
├─ nexlayer-mcp.json              # MCP tool definition
├─ nexlayer.config.stub           # YAML generation hint
├─ nexlayer.yaml                   # Deployment config
├─ openapi.yaml                    # API specification
├─ Dockerfile                      # Container definition
└─ src/
   └─ components/
      └─ DeploymentStatus.tsx      # React component
```

## ✅ Expected Behavior

When an AI agent (Lovable/Replit) interacts with this repo:

1. **Auto-detects** Nexlayer as deployment option
2. **Generates** `nexlayer.yaml` if missing
3. **Integrates** MCP tools for deployment
4. **Shows** deployment URL in interface
5. **Enables** one-click deployment from Lovable/Replit

## 🔧 Manual Testing

To test if AI agents detect these files:

1. **In Lovable**: Ask "What deployment options are available?"
2. **In Replit**: Ask "Can you detect deployment configurations?"
3. **Check logs**: Look for MCP tool discovery messages

## 🎉 Success Criteria

✅ AI agent mentions Nexlayer as deployment option  
✅ Agent can generate `nexlayer.yaml` automatically  
✅ Agent can deploy using MCP tools  
✅ Deployment URL appears in Lovable/Replit interface  

## 📚 Additional Resources

- [Nexlayer Documentation](https://nexlayer.com/docs)
- [MCP Protocol](https://modelcontextprotocol.io)
- [OpenAI Plugin Standard](https://platform.openai.com/docs/plugins)

---

**Note**: These files are designed to work together. Having all of them increases the chance that AI agents will discover and use Nexlayer deployment capabilities.

