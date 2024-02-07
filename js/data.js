
blockList = {
    "0":{
        solid:false,
        rarity:-1
    },
    "艹":{
        color:"green",
        solid:false,
        rarity:5000,
        digTime:100,
        cover:true
    },
    "煤":{
        color:"black",
        solid:true,
        rarity:2000,
        digTime:4000,
        background:"gray"
    },
    "树":{
        color:"#774300",
        solid:true,
        rarity:2000,
        axe:0,
        digTime:2000,
        decomposeTo:[
            "叶","苗","枝",
            "枝","木","叶",
            "果","木","藤"
        ]
    },
    "木":{
        color:"#774300",
        solid:true,
        digTime:2000
    },
    "枝":{
        color:"#774300",
        solid:false,
        digTime:500
    },
    "藤":{
        color:"green",
        solid:false,
        digTime:400
    },
    "叶":{
        color:"green",
        solid:false,
        digTime:400
    },
    "苗":{
        color:"green",
        solid:false,
        digTime:400
    },
    "果":{
        color:"orange",
        solid:false,
        digTime:400
    },
    "石":{
        color:"gray",
        solid:true,
        rarity:2500,
        digTime:4000
    },
    "石（石器）":{
        color:"gray",
        solid:true,
        digTime:200
    },
    "炉":{
        color:"gray",
        solid:true,
        digTime:4000,
    },
    "铁":{
        color:"#220001",
        solid:true,
        rarity:500,
        digTime:6000,
        background:"gray"
    },
    "铁（纯铁）":{
        color:"#DDDDDD",
        solid:true,
        digTime:1000
    },
    "铁（铁制工具）":{
        color:"#DDDDDD",
        solid:true,
        digTime:1000
    },
    "银":{
        color:"#EEEEEE",
        solid:true,
        rarity:500,
        digTime:6500
    },
    "铝":{
        color:"#DEDEDE",
        solid:true,
        rarity:500,
        digTime:7000,
        background:"gray"
    },
    "铝（纯铝）":{
        color:"#DEDEDE",
        solid:true,
        digTime:6500
    },
    "金":{
        color:"gold",
        solid:true,
        rarity:250,
        digTime:75000
    },
    "无":{
        "color":"white",
        solid:true,
        rarity:-1
    },
    "水":{
        "color":"#08C",
        solid:false,
        cover:true
    }
}
//方块属性
craft = [
    {
        "need":["石","石","石",0,"藤",0,0,"枝",0],
        "to":[0,0,0,0,"石（石器）",0  ,0,0,0]
    },
    {
        "need":["石","石","石","石",0,"石","石","石","石"],
        "to":[0,0,0,0,"炉",0,0,0,0]
    },
    {
        "need":[0,"铝",0,"煤","炉",0,0,0,0],
        "to":[0,0,0,0,"炉","铝（纯铝）","石",0,0]
    },
    {
        "need":[0,"铁",0,"煤","炉",0,0,0,0],
        "to":[0,0,0,0,"炉","铁（纯铁）","石",0,0]
    },{
        "need":["铁（纯铁）","铁（纯铁）","铁（纯铁）",0,"枝",0,0,"枝",0],
        "to":[0,0,0,0,"铁（铁制工具）",0  ,0,0,0]
    }
];//合成表
handItem = {
    "石（石器）":{
        type:"increseDigTime",
        value:2
    },
    "铁（铁制工具）":{
        type:"increseDigTime",
        value:5
    }
}
player = {
    "top":7,
    "left":7,
    "hand":["空","空"],
    "w":0,//是否向前移动
    "a":0,//是否向左移动
    "s":0,//是否向后移动
    "d":0,//是否向右移动
    axe:1
}
//玩家信息
mapSize = 64;
//地图大小
riverNum = 3;