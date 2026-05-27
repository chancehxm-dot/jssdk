# JavaScript 混淆和防调试脚本使用说明

## 功能特性

- **代码混淆**：使用 javascript-obfuscator 对 JavaScript 代码进行深度混淆
- **防调试保护**：添加调试保护机制，防止开发者工具调试
- **自卫模式**：启用 self-defending 模式，防止代码被格式化或反混淆
- **控制流扁平化**：使代码逻辑难以理解和逆向工程
- **字符串加密**：对敏感字符串进行 Base64 编码保护

## 安装依赖

```bash
npm install javascript-obfuscator
```

## 使用方法

### 1. 直接运行脚本

```bash
node obfuscate-script.js
```

脚本会自动混淆以下文件：
- `libs/collet-data.js` → `libs/collet-data.obfuscated.js`
- `sohu300x250.js` → `sohu300x250.obfuscated.js`

### 2. 自定义混淆配置

在 `obfuscate-script.js` 文件中，可以修改 `obfuscationOptions` 对象来调整混淆强度：

```javascript
const obfuscationOptions = {
    compact: true,                    // 删除空格和换行符
    controlFlowFlattening: true,      // 控制流扁平化
    deadCodeInjection: true,          // 死代码注入
    debugProtection: true,            // 调试保护
    debugProtectionInterval: 4000,    // 调试保护间隔（毫秒）
    disableConsoleOutput: true,       // 禁用console输出
    identifierNamesGenerator: 'hexadecimal', // 标识符名称生成器
    selfDefending: true,              // 自卫模式
    stringArray: true,                // 字符串数组
    stringArrayEncoding: ['base64'],  // 字符串数组编码
    splitStrings: true,               // 字符串分割
    // ... 其他选项
};
```

### 3. 添加更多文件

如需混淆其他文件，在 `filesToObfuscate` 数组中添加：

```javascript
const filesToObfuscate = [
    {
        input: path.join(__dirname, 'libs', 'collet-data.js'),
        output: path.join(__dirname, 'libs', 'collet-data.obfuscated.js')
    },
    {
        input: path.join(__dirname, 'sohu300x250.js'),
        output: path.join(__dirname, 'sohu300x250.obfuscated.js')
    },
    // 添加更多文件...
    {
        input: path.join(__dirname, 'your-file.js'),
        output: path.join(__dirname, 'your-file.obfuscated.js')
    }
];
```

## 防调试特性

混淆后的代码包含以下防调试保护：

1. **定时调试器断点**：每4秒触发一次 `debugger` 语句
2. **控制台输出禁用**：阻止 `console.log` 等输出
3. **代码自卫**：防止代码被格式化或美化
4. **死代码注入**：添加无用但有效的代码干扰分析

## 注意事项

⚠️ **重要提醒**：

1. **备份原始文件**：混淆是不可逆的操作，请确保备份原始源码
2. **测试功能**：混淆后务必测试所有功能是否正常工作
3. **性能影响**：高强度混淆可能会影响代码执行性能
4. **合规性**：请确保混淆后的代码仍符合相关隐私法规要求

## 隐私合规说明

根据项目规范，混淆后的代码仍需遵守：
- 禁止未经同意收集高风险标识信息
- 必须实现用户知情同意机制  
- 遵循数据最小化原则
- 满足 GDPR、CCPA 及中国个人信息保护法要求
- 对敏感数据进行脱敏处理

## 技术支持

如遇到问题，请检查：
- Node.js 版本是否 >= 18.0.0
- 是否正确安装了 javascript-obfuscator 依赖
- 输入文件路径是否正确
- 输出目录是否有写入权限