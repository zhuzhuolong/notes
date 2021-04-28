module.exports = {
    title: '文档库',
    description: 'Just playing notes',
    themeConfig: {
        logo: '/assets/img/logo.png',
        prevLinks: false,
        nextLinks: false,
        nav: [{
                text: '主页',
                link: '/'
            },
            {
                text: 'Flutter',
                link: '/Flutter/'
            },
            {
                text: 'PHP',
                link: '/php/'
            },
        ],
        sidebar: [{
                title: 'Flutter', // 必要的
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2, // 可选的, 默认值是 1
                children: [{
                    title: '安装', // 必要的
                    path: '/Flutter/install', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                }]
            },
            {
                title: 'Mysql 规范',
                collapsable: false, 
                sidebarDepth: 2,
                children: [
                    {
                        title: "MySQL使用约束及建议",
                        path:"/mysql/advise",
                        sidebarDepth: 2,
                    },
                    {
                        title: "MySQL特点",
                        path:"/mysql/spec",
                        sidebarDepth: 2,
                    },
                    {
                        title: "Schema设计规范",
                        path:"/mysql/schema",
                        sidebarDepth: 2,
                    },
                    {
                        title: "Sql规范",
                        path:"/mysql/sql",
                        sidebarDepth: 2,
                    }                
                ],
            }
        ],
        // sidebar: 'auto',
        search: false,
        smoothScroll: true,
        sidebarDepth: 2,
        displayAllHeaders: false
    }
}