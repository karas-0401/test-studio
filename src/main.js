/**
 * Karas Studio 主应用程序文件
 * 这个文件是整个应用的入口点，负责初始化和管理所有功能模块
 * 
 * 主要功能包括：
 * - SVG Logo 的加载和显示
 * - 用户交互效果（鼠标悬停、点击等）
 * - 页面进场动画
 * - 键盘快捷键支持
 */

// 导入主样式文件 - 包含所有页面样式和动画效果
import './styles/main.css';

// 导入 SVG Logo 组件 - 用于创建和渲染 Karas Studio 的标志
import { createKarasLogo } from './components/KarasLogo.js';

/**
 * KarasStudioApp 主应用类
 * 这是整个应用的核心类，负责管理所有功能模块
 * 
 * 设计模式：单例模式 - 整个应用只有一个实例
 * 职责：
 * - 初始化应用的各个组件
 * - 管理用户交互
 * - 控制动画效果
 * - 处理事件监听
 */
class KarasStudioApp {
    /**
     * 构造函数
     * 当创建 KarasStudioApp 实例时自动调用
     * 立即执行初始化方法来启动应用
     */
    constructor() {
        this.init();
    }

    /**
     * 应用初始化方法
     * 这是应用启动的核心方法，按顺序执行所有初始化步骤
     * 
     * 执行顺序很重要：
     * 1. 首先加载 Logo（DOM 元素需要先存在）
     * 2. 然后添加交互效果（需要 Logo 元素已加载）
     * 3. 最后设置进场动画（需要所有元素都准备好）
     */
    init() {
        this.loadLogo();        // 加载并渲染 SVG Logo
        this.addInteractions(); // 添加用户交互事件监听器
        this.setupAnimations(); // 设置页面进场动画效果
    }

    /**
     * 加载 SVG Logo 方法
     * 负责将 SVG Logo 插入到页面的指定容器中
     * 
     * 工作流程：
     * 1. 通过 ID 查找 logo 容器元素
     * 2. 调用 createKarasLogo() 函数生成 SVG 代码
     * 3. 将 SVG 代码插入到容器的 innerHTML 中
     * 4. 输出成功日志用于调试
     * 
     * 错误处理：如果找不到容器元素，方法会静默失败（不会报错）
     */
    loadLogo() {
        // 获取页面中 id 为 'logo-container' 的 DOM 元素
        const logoContainer = document.getElementById('logo-container');
        
        // 检查容器是否存在（防御性编程）
        if (logoContainer) {
            // 调用导入的函数生成 SVG Logo 代码，并插入到容器中
            logoContainer.innerHTML = createKarasLogo();
            
            // 输出成功日志，便于开发调试
            console.log('Logo loaded successfully');
        }
    }

    /**
     * 添加用户交互效果
     * 为页面元素绑定各种交互事件监听器
     * 
     * 包含的交互功能：
     * 1. 标题文字的鼠标悬停效果（加速/恢复动画）
     * 2. Logo 的点击效果（触发缩放旋转动画）
     * 
     * 设计理念：
     * - 提供即时的视觉反馈
     * - 增强用户体验的趣味性
     * - 保持交互的一致性和流畅性
     */
    addInteractions() {
        // === 标题文字的鼠标悬停效果 ===
        
        // 获取标题元素（带有闪光动画的主标题）
        const titleElement = document.querySelector('.text-title');
        
        if (titleElement) {
            // 鼠标进入时：加速闪光动画（从 3 秒缩短到 1 秒）
            titleElement.addEventListener('mouseenter', () => {
                titleElement.style.animationDuration = '1s';
            });

            // 鼠标离开时：恢复正常动画速度（回到 3 秒）
            titleElement.addEventListener('mouseleave', () => {
                titleElement.style.animationDuration = '3s';
            });
        }

        // === Logo 的点击交互效果 ===
        
        // 获取 Logo 容器元素
        const logoContainer = document.getElementById('logo-container');
        
        if (logoContainer) {
            // 点击 Logo 时触发动画效果
            logoContainer.addEventListener('click', () => {
                this.animateLogo(); // 调用 Logo 动画方法
            });
        }
    }

    /**
     * Logo 点击动画效果
     * 创建一个短暂的缩放和旋转动画，提供点击反馈
     * 
     * 动画流程：
     * 1. Logo 放大到 110% 并顺时针旋转 5 度
     * 2. 300ms 后回到原始状态（100% 大小，0 度旋转）
     * 
     * 技术细节：
     * - 使用 CSS transform 属性实现缩放和旋转
     * - 使用 CSS transition 实现平滑过渡
     * - 使用 setTimeout 控制动画时序
     * 
     * 用户体验：
     * - 提供即时的点击反馈
     * - 动画时间短暂，不会干扰用户操作
     * - 视觉效果明显但不过于夸张
     */
    animateLogo() {
        // 获取 Logo 容器内的 SVG 元素
        const svg = document.querySelector('#logo-container svg');
        
        if (svg) {
            // 第一阶段：放大并旋转（立即执行）
            svg.style.transform = 'scale(1.1) rotate(5deg)';  // 放大到 110%，顺时针旋转 5 度
            svg.style.transition = 'all 0.3s ease';           // 设置 0.3 秒的平滑过渡
            
            // 第二阶段：300ms 后回到原始状态
            setTimeout(() => {
                svg.style.transform = 'scale(1) rotate(0deg)'; // 回到 100% 大小，0 度旋转
            }, 300);
        }
    }

    // 设置进场动画
    /**
     * 设置页面进场动画
     * 负责创建页面加载时的淡入和滑入效果
     * 
     * 动画设计思路：
     * - 初始状态：元素透明且向下偏移
     * - 动画效果：逐渐变为不透明并回到原位置
     * - 时间差：文字先动画，Logo 后动画，创造层次感
     * 
     * 技术实现：
     * - 使用 CSS transform 和 opacity 属性
     * - 通过 setTimeout 控制动画时序
     * - 使用 CSS transition 实现平滑过渡
     */
    setupAnimations() {
        // 获取需要添加动画的 DOM 元素
        const textElement = document.getElementById('main-text');      // 主文字容器
        const logoContainer = document.getElementById('logo-container'); // Logo 容器

        // 确保两个元素都存在才执行动画
        if (textElement && logoContainer) {
            // === 设置初始状态（动画开始前的状态） ===
            
            // 文字元素初始状态：完全透明，向下偏移 30px
            textElement.style.opacity = '0';
            textElement.style.transform = 'translateY(30px)';
            
            // Logo 元素初始状态：完全透明，向下偏移 50px（比文字偏移更多）
            logoContainer.style.opacity = '0';
            logoContainer.style.transform = 'translateY(50px)';

            // === 执行进场动画 ===
            
            // 300ms 后开始文字动画（第一个动画）
            setTimeout(() => {
                textElement.style.transition = 'all 1s ease';  // 设置 1 秒的平滑过渡
                textElement.style.opacity = '1';               // 变为完全不透明
                textElement.style.transform = 'translateY(0)'; // 回到原始位置
            }, 300);

            // 600ms 后开始 Logo 动画（第二个动画，创造层次感）
            setTimeout(() => {
                logoContainer.style.transition = 'all 1s ease';  // 设置 1 秒的平滑过渡
                logoContainer.style.opacity = '0.3';             // 设置为 30% 透明度（与 CSS 保持一致）
                logoContainer.style.transform = 'translateY(0)'; // 回到原始位置
            }, 600);
        }
    }

    // 添加更多交互功能
    /**
     * 添加键盘快捷键功能
     * 为应用添加键盘交互支持，提升用户体验
     * 
     * 支持的快捷键：
     * - 空格键 (Space)：触发 Logo 动画效果
     * - R 键 (KeyR)：重新加载页面，重置所有状态
     * 
     * 设计考虑：
     * - 使用 keydown 事件确保响应及时
     * - 使用 e.preventDefault() 阻止默认行为
     * - 快捷键选择直观易记
     * 
     * 扩展性：
     * - 可以轻松添加更多快捷键
     * - 事件处理逻辑清晰，便于维护
     */
    addKeyboardShortcuts() {
        // 监听全局键盘按下事件
        document.addEventListener('keydown', (e) => {
            // 空格键：触发 Logo 动画
            if (e.code === 'Space') {
                e.preventDefault(); // 阻止页面滚动等默认行为
                this.animateLogo(); // 执行 Logo 动画
            }
            
            // R 键：重新加载页面
            if (e.code === 'KeyR') {
                location.reload(); // 刷新页面，重置所有状态
            }
        });
    }
}

/**
 * ============================================================================
 * 应用启动和初始化代码
 * ============================================================================
 */

/**
 * 页面加载完成事件监听器
 * 
 * 为什么使用 DOMContentLoaded：
 * - 确保 HTML 文档完全加载和解析后再执行 JavaScript
 * - 比 window.onload 更快，因为不需要等待图片、样式表等资源
 * - 是现代 Web 开发的最佳实践
 * 
 * 执行流程：
 * 1. 创建 KarasStudioApp 实例
 * 2. 实例化时自动调用 constructor，进而调用 init()
 * 3. 输出初始化成功日志
 * 4. 将应用实例暴露到全局作用域（便于调试）
 */
document.addEventListener('DOMContentLoaded', () => {
    // 创建应用主实例
    const app = new KarasStudioApp();
    
    // 输出初始化成功日志
    console.log('Karas Studio App initialized');
    
    // 将应用实例暴露到全局作用域
    // 这样在浏览器控制台中可以通过 window.karasApp 访问应用实例
    // 主要用于开发调试，生产环境中可以考虑移除
    window.karasApp = app;
});

/**
 * ============================================================================
 * 开发环境热更新支持
 * ============================================================================
 */

/**
 * Vite 热更新 (HMR - Hot Module Replacement) 支持
 * 
 * 什么是热更新：
 * - 在开发过程中，当代码发生变化时，无需刷新整个页面
 * - 只更新发生变化的模块，保持应用状态
 * - 大大提升开发效率和体验
 * 
 * import.meta.hot 说明：
 * - 这是 Vite 提供的热更新 API
 * - 只在开发环境中存在，生产环境中为 undefined
 * - 通过条件判断确保生产环境不会执行相关代码
 * 
 * 技术细节：
 * - import.meta.hot.accept() 接受当前模块的更新
 * - 当模块更新时，执行回调函数
 * - 可以在回调中处理状态保存、重新初始化等逻辑
 */
if (import.meta.hot) {
    // 接受当前模块的热更新
    import.meta.hot.accept(() => {
        // 热更新时的回调函数
        // 可以在这里添加状态保存、重新初始化等逻辑
        console.log('Hot reload detected');
    });
}