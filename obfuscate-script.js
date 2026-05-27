#!/usr/bin/env node

/**
 * JavaScript 混淆和防调试脚本
 * 
 * 功能：
 * - 深度混淆 JavaScript 代码
 * - 添加防调试保护机制
 * - 启用自卫模式防止反混淆
 * - 字符串加密和控制流扁平化
 * 
 * 使用方法：
 * 1. 安装依赖：npm install javascript-obfuscator
 * 2. 运行脚本：node obfuscate-script.js
 * 
 * 输出文件：
 * - libs/collet-data.js → libs/collet-data.obfuscated.js  
 * - sohu300x250.js → sohu300x250.obfuscated.js
 */

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// 配置混淆选项 - 使用基本且确定支持的选项
const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    identifiersPrefix: '_0x',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    sourceMap: false,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    target: 'browser'
};

/**
 * 读取文件内容
 * @param {string} filePath - 文件路径
 * @returns {string} 文件内容
 */
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`读取文件失败: ${filePath}`, error.message);
        process.exit(1);
    }
}

/**
 * 写入文件内容
 * @param {string} filePath - 文件路径
 * @param {string} content - 文件内容
 */
function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`文件已成功写入: ${filePath}`);
    } catch (error) {
        console.error(`写入文件失败: ${filePath}`, error.message);
        process.exit(1);
    }
}

/**
 * 混淆单个文件
 * @param {string} inputPath - 输入文件路径
 * @param {string} outputPath - 输出文件路径
 */
function obfuscateFile(inputPath, outputPath) {
    console.log(`正在混淆文件: ${inputPath}`);
    
    const sourceCode = readFile(inputPath);
    
    try {
        const obfuscatedCode = JavaScriptObfuscator.obfuscate(sourceCode, obfuscationOptions).getObfuscatedCode();
        
        // 添加额外的防调试代码
        const antiDebugCode = `
// 防调试保护
(function() {
    var _0x123456 = setInterval(function() {
        debugger;
    }, 4000);
})();
`;
        
        const finalCode = obfuscatedCode + antiDebugCode;
        writeFile(outputPath, finalCode);
        console.log(`混淆完成: ${outputPath}`);
    } catch (error) {
        console.error(`混淆失败: ${inputPath}`, error.message);
        process.exit(1);
    }
}

/**
 * 主函数
 */
function main() {
    // 定义要混淆的文件列表
    const filesToObfuscate = [
        {
            input: path.join(__dirname, 'libs', 'collet-data.js'),
            output: path.join(__dirname, 'libs', 'collet-data.obfuscated.js')
        },
        {
            input: path.join(__dirname, 'sohu300x250.js'),
            output: path.join(__dirname, 'sohu300x250.obfuscated.js')
        }
    ];
    
    console.log('开始混淆JavaScript文件...');
    
    filesToObfuscate.forEach(file => {
        if (fs.existsSync(file.input)) {
            obfuscateFile(file.input, file.output);
        } else {
            console.warn(`文件不存在，跳过: ${file.input}`);
        }
    });
    
    console.log('所有文件混淆完成！');
}

// 如果直接运行此脚本，则执行主函数
if (require.main === module) {
    main();
}

module.exports = {
    obfuscateFile,
    obfuscationOptions
};