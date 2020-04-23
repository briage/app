const LABELS = [
    '初中',
    '小学',
    '高中',
    '中考',
    '词汇',
    '作文',
    '专项',
    '包过',
    '听力',
    '四级',
    '六级',
    '雅思',
    '托福',
];

const SEX = [
    { label: '男', value: 0 },
    { label: '女', value: 1 }
];

const WEEK = [
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
    '周日'
];

const diffculty = [
    '不限',
    '★',
    '★★',
    '★★★',
    '★★★★',
    '★★★★★'
];

const testType = [
    '单选',
    '多选',
    '作文',
    '听力'
];

const testNumName = [
    'onlyChoiceNum',
    'multifyChoiceNum',
    'writeNum',
    'listenNum'
];

const options = [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'C', value: 'C'},
    {label: 'D', value: 'D'},
    {label: 'E', value: 'E'},
    {label: 'F', value: 'F'},
    {label: 'G', value: 'G'},
    {label: 'H', value: 'H'},
    {label: 'I', value: 'I'},
    {label: 'J', value: 'J'},
    {label: 'K', value: 'K'},
    {label: 'L', value: 'L'},
    {label: 'M', value: 'M'},
    {label: 'N', value: 'N'},
];

const VIP_LEVEL = {
    '青铜 V0': [0, 0],
    '白银 V1': [1, 99],
    '白银 V2': [100, 299],
    '黄金 V3': [300, 699],
    '黄金 V4': [700, 1499],
    '铂金 V5': [1500, 3099],
    '铂金 V6': [3100, 6299],
    '永恒钻石 V7': [6300, 12699],
    '至尊星耀 V8': [12700, 25499],
    '最强王者 V9': [25500, 51099],
    '荣耀王者 V10': [51100, Infinity]
}

const word = [
    { word: 'word', mean: '单词' },
    { word: 'wear', mean: '穿着；衣物' },
    { word: 'able', mean: '能够的；有能力的；有才干的；干练的' },
    { word: 'live', mean: '居住；生存；活着' },
    { word: 'study', mean: '学习' },
    { word: 'april', mean: '四月' },
    { word: 'basket', mean: '篮；一篮；（篮球运动的）篮；投篮得分' },
    { word: 'config', mean: '配置' },
    { word: 'page', mean: '页；页面' },
    { word: 'boundary', mean: '分界线；范围；（球场）边线' },
    { word: 'card', mean: '卡片' },
    { word: 'game', mean: '游戏' },
    { word: 'search', mean: '查询；搜索' },
    { word: 'cafe', mean: '咖啡' },
    { word: 'style', mean: '方式' },
    { word: 'chart', mean: '图表；航海图；排行榜' },
    { word: 'play', mean: '播放；玩' },
    { word: 'cloud', mean: '云；云状物；一团；阴影' },
]

export { LABELS, SEX, WEEK, diffculty, testType, testNumName, options, VIP_LEVEL, word };