# 发布插件到 VS Code Marketplace

> 很久没发插件忘了怎么操作？看这篇就够了。

## 前置条件

- 已安装 `vsce`：
  ```bash
  npm install -g @vscode/vsce
  ```
- 插件版本号已确认（`package.json` 里的 `version`）

---

## 1. PAT 过期了怎么办？

VS Code Marketplace 使用 **Azure DevOps Personal Access Token (PAT)** 来验证发布者身份。PAT 有过期时间，过期后需要重新生成，**无法找回旧的**。

### 重新生成 PAT

1. 打开 [https://dev.azure.com](https://dev.azure.com)，登录你的微软账号
2. 进入你创建过的组织（如果忘了组织名，通常和你的 publisher 名相关）
3. 点击右上角头像 → **Personal access tokens**
4. 点击 **New Token**
5. 填写信息：
   - **Name**：随意，例如 `vscode-publish`
   - **Organization**：选择 `All accessible organizations`
   - **Expiration**：选择过期时间（建议选 1 年，到期再来这里重新生成）
   - **Scopes**：选 **Custom defined**
     - 展开 **Marketplace**，勾选 **Manage**
6. 点击 **Create**，**立刻复制生成的 Token**（关闭后无法再次查看）

---

## 2. 用 PAT 登录 vsce

在插件项目根目录下运行：

```bash
vsce login ninja-57
```

按提示粘贴刚才复制的 PAT，回车。

登录成功后，本地会保存凭据，下次发布不需要再登录（直到 PAT 过期）。

---

## 3. 发布插件

### 一键发布（推荐）

```bash
npm run publish:marketplace
```

这条命令会：
1. 自动把 `package.json` 版本号的最后一位 +1（如 `0.0.6` → `0.0.7`）
2. 编译并打包
3. 发布到 VS Code Marketplace
4. **不会**创建 git tag

### 手动发布

如果你不想自动递增版本号，可以手动改好 `package.json` 里的 `version`，然后运行：

```bash
vsce publish
```

---

## 常见问题

**Q：发布时提示 `Error: Access Denied`**
A：PAT 过期了，或者 Token 权限没有勾选 **Marketplace > Manage**。请按上面步骤重新生成。

**Q：发布时提示 `version already exists`**
A：Marketplace 上已经有这个版本号了。手动修改 `package.json` 里的 `version` 再发。

**Q：怎么确认发布成功？**
A：去 [marketplace.visualstudio.com](https://marketplace.visualstudio.com) 搜索你的插件名，或者访问管理页面 [marketplace.visualstudio.com/manage/publishers](https://marketplace.visualstudio.com/manage/publishers)。
