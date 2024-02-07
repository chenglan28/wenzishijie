window.onresize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    document.getElementById("title").style.fontSize = w / 18 + "px";
    if(w > h){
        mapObjectSize = h;
        document.getElementById("info").style.width = w - h - 10 + "px";
        document.getElementById("info").style.height = h - 10 + "px";
    }
    else {
        mapObjectSize = w;
        document.getElementById("info").style.width = w - 10 + "px";
        document.getElementById("info").style.height = h - w - 10 + "px";
    }
    document.getElementById("map").width = mapObjectSize;
    document.getElementById("map").height = mapObjectSize;
    mapBlockSize = mapObjectSize / 15;
}
window.onresize();
document.getElementById("xyz").innerHTML = player.left + "," + player.top;
StartingTransitionOpacity = 100;
//开始界面过渡的透明度
StartingTransitionAnimation = undefined;
//开始动画
HideStartingTransitionAnimation = undefined;
//关闭过渡界面的动画
focus = () => {
    if(focusLeft >= 0 && focusLeft < mapSize && focusTop >= 0 && focusTop < mapSize){
        var block = map[focusTop][focusLeft];
        if(block == undefined || block == 0)document.getElementById("focus").innerHTML = "";
        else {
            document.getElementById("focus").style.color = blockList[block].color;
            document.getElementById("focus").innerHTML = block;
        }
    }
}
//选中显示
mouseDown = 0;
digProcess = 0;
digBlock = [-1,-1];
shift = 0;
intoGame = (world) => {
    document.getElementById("map").onmousemove = (event) => {
        mouseTop = event.clientY;
        mouseLeft = event.clientX;
        focusTop = player.top - 7 + Math.floor(mouseTop / (mapObjectSize / 15));
        focusLeft = player.left - 7 + Math.floor(mouseLeft / (mapObjectSize / 15));
        focus();
    }
    document.getElementById("map").onmousedown = () => {
        mouseDown = 1;
    }
    document.getElementById("map").onmouseup = () => {
        mouseDown = 0;
        document.getElementById("digProcess").innerHTML = "";
    }
    if(world || world == 0){
        world = worldList[Object.keys(worldList)[world]];
        map = world.map;
        player = world.player;
        mapSize = world.mapSize;
    }
    else GenerateTerrain();
    //生成地形
    Rendering();
    //渲染
    clearInterval(StartingTransitionAnimation);
    StartingTransitionAnimation = undefined;
    //结束开始动画
    console.log(player)
    document.getElementById("worldName").value = player.worldName;
    document.getElementById("StartingTransition").style.display = "block";
    document.getElementById("startUI").style.display = "none";
    document.getElementById("demo").style.display = "block";
    //加载界面
    focusLeft = -1;
    focusTop = -1;
    if(HideStartingTransitionAnimation == undefined){
        setTimeout(()=>{
            HideStartingTransitionAnimation = setInterval(()=>{
                StartingTransitionOpacity--;
                document.getElementById("StartingTransition").style.opacity = StartingTransitionOpacity / 100;
                if(StartingTransitionOpacity <= 0){
                    setInterval(()=>{
                        save("auto");
                        document.getElementById("save").innerHTML = "自动保存✔"
                    },30000)
                    document.getElementById("StartingTransition").style.display = "none";
                    clearInterval(HideStartingTransitionAnimation);
                    HideStartingTransitionAnimation = undefined;
                    addEventListener("keydown",(e)=>{
                        if(e.key == "w" || e.key == "W")player.w = 1;
                        else if(e.key == "a" || e.key == "A")player.a = 1;
                        else if(e.key == "s" || e.key == "S")player.s = 1;
                        else if(e.key == "d" || e.key == "D")player.d = 1;
                        else if(e.key == "o" || e.key == "O"){
                            document.getElementById("throwLeftItem").style.color = "black";
                            document.getElementById("throwLeftItem").style.background = "white";
                            throwItem(0);
                        }
                        else if(e.key == "p" || e.key == "P"){
                            document.getElementById("throwRightItem").style.color = "black";
                            document.getElementById("throwRightItem").style.background = "white";
                            throwItem(1);
                        }
                        else if(e.key == "q" || e.key == "Q"){
                            document.getElementById("putLeftItem").style.color = "black";
                            document.getElementById("putLeftItem").style.background = "white";
                            putItem(0);
                        }
                        else if(e.key == "e" || e.key == "E"){
                            document.getElementById("putRightItem").style.color = "black";
                            document.getElementById("putRightItem").style.background = "white";
                            putItem(1);
                        }
                        else if(e.key == "r" || e.key == "R"){
                            document.getElementById("craft").style.color = "black";
                            document.getElementById("craft").style.background = "white";
                            if(
                                player.top >= focusTop - 1 && 
                                player.top <= focusTop + 1 && 
                                player.left >= focusLeft - 1 && 
                                player.left <= focusLeft + 1
                            )document.getElementById("digProcess").innerHTML = "请勿站在合成工序中";
                            else {
                                craft.forEach(item=>{
                                    if(
                                        map[focusTop - 1][focusLeft - 1] == item.need[0] &&
                                        map[focusTop - 1][focusLeft] == item.need[1] &&
                                        map[focusTop - 1][focusLeft + 1] == item.need[2] &&
                                        map[focusTop][focusLeft - 1] == item.need[3] &&
                                        map[focusTop][focusLeft] == item.need[4] &&
                                        map[focusTop][focusLeft + 1] == item.need[5] &&
                                        map[focusTop + 1][focusLeft - 1] == item.need[6] &&
                                        map[focusTop + 1][focusLeft] == item.need[7] &&
                                        map[focusTop + 1][focusLeft + 1] == item.need[8]
                                    ){
                                        map[focusTop - 1][focusLeft - 1] = item.to[0]
                                        map[focusTop - 1][focusLeft] = item.to[1]
                                        map[focusTop - 1][focusLeft + 1] = item.to[2]
                                        map[focusTop][focusLeft - 1] = item.to[3]
                                        map[focusTop][focusLeft] = item.to[4]
                                        map[focusTop][focusLeft + 1] = item.to[5]
                                        map[focusTop + 1][focusLeft - 1] = item.to[6]
                                        map[focusTop + 1][focusLeft] = item.to[7]
                                        map[focusTop + 1][focusLeft + 1] = item.to[8]
                                        Rendering();
                                    }
                                });
                            }
                        }
                        else if(e.key == "Shift"){
                            shift = 1;
                        }
                    });
                    addEventListener("keyup",(e)=>{
                        if(e.key == "w" || e.key == "W")player.w = 0;
                        else if(e.key == "a" || e.key == "A")player.a = 0;
                        else if(e.key == "s" || e.key == "S")player.s = 0;
                        else if(e.key == "d" || e.key == "D")player.d = 0;
                        else if(e.key == "o" || e.key == "O"){
                            document.getElementById("throwLeftItem").style.color = "white";
                            document.getElementById("throwLeftItem").style.background = "black";
                        }
                        else if(e.key == "p" || e.key == "P"){
                            document.getElementById("throwRightItem").style.color = "white";
                            document.getElementById("throwRightItem").style.background = "black";
                        }
                        else if(e.key == "q" || e.key == "Q"){
                            document.getElementById("putLeftItem").style.color = "white";
                            document.getElementById("putLeftItem").style.background = "black";
                        }
                        else if(e.key == "e" || e.key == "E"){
                            document.getElementById("putRightItem").style.color = "white";
                            document.getElementById("putRightItem").style.background = "black";
                        }
                        else if(e.key == "r" || e.key == "R"){
                            document.getElementById("craft").style.color = "white";
                            document.getElementById("craft").style.background = "black";
                        }
                        else if(e.key == "Shift"){
                            shift = 0;
                        }
                    });
                    setInterval(()=>{
                        if(player.w == 1){
                            if(player.top - 1 >= 0 && 
                               !blockList[map[player.top - 1][player.left]].solid){
                                player.top--;
                            }
                        }
                        if(player.a == 1){
                            if(player.left - 1 >= 0 && 
                               !blockList[map[player.top][player.left - 1]].solid){
                                player.left--;
                            }
                        }
                        if(player.s == 1){
                            if(player.top + 1 <= mapSize - 1 && 
                               !blockList[map[player.top + 1][player.left]].solid){
                                player.top++;
                            }
                        }
                        if(player.d == 1){
                            if(player.left + 1 <= mapSize - 1 && 
                               !blockList[map[player.top][player.left + 1]].solid){
                                player.left++;
                            }
                        }
                        document.getElementById("xyz").innerHTML = player.left + "," + player.top;
                        focus();
                        //玩家行走
                        if(mouseDown == 1){
                            if((shift == 1 && !blockList[map[focusTop][focusLeft]].decomposeTo) || !blockList[map[focusTop][focusLeft]].digTime)document.getElementById("digProcess").innerHTML = "无法挖掘或分解";
                            else if(
                                shift == 1 && 
                                (
                                    map[focusTop - 1][focusLeft - 1] == undefined || map[focusTop - 1][focusLeft - 1] != 0 || 
                                    map[focusTop - 1][focusLeft] == undefined || map[focusTop - 1][focusLeft] != 0 || 
                                    map[focusTop - 1][focusLeft + 1] == undefined || map[focusTop - 1][focusLeft + 1] != 0 || 
                                    map[focusTop][focusLeft + 1] == undefined || map[focusTop][focusLeft + 1] != 0 || 
                                    map[focusTop + 1][focusLeft + 1] == undefined || map[focusTop + 1][focusLeft + 1] != 0 || 
                                    map[focusTop + 1][focusLeft] == undefined || map[focusTop + 1][focusLeft] != 0 || 
                                    map[focusTop + 1][focusLeft - 1] == undefined || map[focusTop + 1][focusLeft - 1] != 0 || 
                                    map[focusTop][focusLeft - 1] == undefined || map[focusTop][focusLeft - 1] != 0
                                )
                            ){
                                document.getElementById("digProcess").innerHTML = "没有足够的位置分解（请将所选方块周围八个格子清空）";
                            }
                            else if(
                                shift == 1 && 
                                player.top >= focusTop - 1 && 
                                player.top <= focusTop + 1 && 
                                player.left >= focusLeft - 1 && 
                                player.left <= focusLeft + 1
                            )document.getElementById("digProcess").innerHTML = "没有足够的位置分解（请不要站在所选方块周围八个格子内）";
                            else if(shift == 0 && player.hand[0] != "空" && player.hand[1] != "空" )document.getElementById("digProcess").innerHTML = "没有多余的空间收纳（请空出至少一只手）";
                            else {
                                var improve = 1;
                                Object.keys(handItem).forEach(item=>{
                                    if((player.hand[0] == item || player.hand[1] == item) && handItem[item].type == "increseDigTime")improve = handItem[item].value;
                                })
                                digProcess += 200 * improve;
                                document.getElementById("digProcess").innerHTML = "挖掘进度: " + Math.floor(digProcess / blockList[map[focusTop][focusLeft]].digTime * 1000) / 10 + "%"
                                if(digBlock[0] != focusTop){
                                    digBlock[0] = focusTop;
                                    digProcess = 0;
                                    // document.getElementById("digProcess").innerHTML = "";
                                }
                                if(digBlock[1] != focusLeft){
                                    digBlock[1] = focusLeft;
                                    digProcess = 0;
                                    document.getElementById("digProcess").innerHTML = "";
                                }
                                if(digProcess >= blockList[map[focusTop][focusLeft]].digTime){
                                    if(shift == 0) {
                                        if(player.hand[0] == "空"){
                                            player.hand[0] = map[digBlock[0]][digBlock[1]];
                                            document.getElementById("leftHand").innerHTML = player.hand[0];
                                            document.getElementById("leftHand").style.color = blockList[player.hand[0]].color;
                                        }
                                        else if(player.hand[1] == "空"){
                                            player.hand[1] = map[digBlock[0]][digBlock[1]];
                                            document.getElementById("rightHand").innerHTML = player.hand[1];
                                            document.getElementById("rightHand").style.color = blockList[player.hand[1]].color;
                                        }
                                        map[digBlock[0]][digBlock[1]] = 0;
                                    }
                                    else {
                                        var decomposeBlock = map[digBlock[0]][digBlock[1]];
                                        map[focusTop - 1][focusLeft - 1] = blockList[decomposeBlock].decomposeTo[0];
                                        map[focusTop - 1][focusLeft] = blockList[decomposeBlock].decomposeTo[1];
                                        map[focusTop - 1][focusLeft + 1] = blockList[decomposeBlock].decomposeTo[2];
                                        map[focusTop][focusLeft - 1] = blockList[decomposeBlock].decomposeTo[3];
                                        map[focusTop][focusLeft] = blockList[decomposeBlock].decomposeTo[4];
                                        map[focusTop][focusLeft + 1] = blockList[decomposeBlock].decomposeTo[5];
                                        map[focusTop + 1][focusLeft - 1] = blockList[decomposeBlock].decomposeTo[6];
                                        map[focusTop + 1][focusLeft] = blockList[decomposeBlock].decomposeTo[7];
                                        map[focusTop + 1][focusLeft + 1] = blockList[decomposeBlock].decomposeTo[8];
                                    }
                                    document.getElementById("digProcess").innerHTML = "";
                                }
                            }
                        }
                        else digProcess = 0;
                        Rendering();
                    },200);
                }
            },10);
        },500);
    }
}
start = (world) => {
    if(StartingTransitionAnimation == undefined){
        mapSize = Number(document.getElementById("mapSize").value);
        if(mapSize == 0)mapSize = 128;
        startButtonRotate = 0;
        StartingTransitionAnimation = setInterval(()=>{
            startButtonRotate += 44;
            document.getElementById("start").style.transform = "rotate(" + startButtonRotate + "deg)";
            if(startButtonRotate > 1000){
                intoGame(world);
            }
        },10);
    }
    else {
        intoGame(world);
    }//跳过动画
}
map = [];
GenerateTerrain = () => {
    for(var i = 0;i < mapSize;i++){
        map.push(new Array(mapSize).fill(0));
    }
    //生成空地图
    Object.keys(blockList).forEach(item=>{
        var blockData = blockList[item]
        if(blockData.rarity > 0){
            for(var i = 0,num=Math.floor(Math.random()*(mapSize * mapSize * blockData.rarity / 10000/*根据占比生成*/));i<num;i++){
                var xyz = [Math.floor(Math.random()*mapSize),Math.floor(Math.random()*mapSize)]
                if(xyz != [player.top,player.left])map[xyz[0]][xyz[1]] = item;
            }
        }
    });
    //生成随机方块
    for(var _i = 0;_i<riverNum;_i++){
        var trend = Math.floor(Math.random()*2);//走向 | 0:南北 | 1:东西
        var height = Math.floor(Math.random()*3) + 2;
        var point = Math.floor(Math.random()*mapSize);
        for(var i = 0;i<mapSize;i++){
            if(trend == 0){
                if(point >= 0 && point < mapSize)map[i][point] = "水";
                for(var j = 1;j<height;j++){
                    if(point - j >= 0 && point - j < mapSize)map[i][point - j] = "水";
                    if(point + j >= 0 && point + j < mapSize)map[i][point + j] = "水";
                }
            }
            if(trend == 1){
                if(point >= 0 && point < mapSize)map[point][i] = "水";
                for(var j = 1;j<height;j++){
                    if(point - j >= 0 && point - j < mapSize)map[point - j][i] = "水";
                    if(point + j >= 0 && point + j < mapSize)map[point + j][i] = "水";
                }
            }
            var deviation = Math.floor(Math.random()*5);
            if(deviation == 0)point--;
            else if(deviation == 4)point++;
        }
    }
    //生成河流
}
Rendering = () => {
    document.getElementById("map").width--;
    document.getElementById("map").width++;
    var c = document.getElementById("map").getContext("2d");
    // console.log(mapBlockSize)
    c.font = mapBlockSize + "px Arial";
    c.fillStyle = "white";
    for(var i = 0;i<15;i++){
        for(var j = 0;j<15;j++){
            if(i == 7 && j == 7){
                c.fillStyle = "red";
                c.fillRect(mapBlockSize * j,mapBlockSize * i,mapBlockSize,mapBlockSize);
                c.fillStyle = "white";
                c.fillText("我",mapBlockSize * j,mapBlockSize * (i + 1) - 5);
            }
            else {
                if(i - 7 + player.top < 0 || i - 7 + player.top > mapSize - 1 || j - 7 + player.left < 0 || j - 7 + player.left > mapSize - 1)var block = "无";
                else var block = map[i - 7 + player.top][j - 7 + player.left];
                if(block && block != 0){
                    if(blockList[block].background){
                        c.fillStyle = blockList[block].background;
                        c.fillRect(mapBlockSize * j,mapBlockSize * i,mapBlockSize,mapBlockSize);
                    }
                    c.fillStyle = blockList[block].color;
                    c.fillText(block[0],mapBlockSize * j,mapBlockSize * (i + 1) - 5);
                }
            }
        }
    }
}
throwItem = (hand) => {
    player.hand[hand] = "空";
    document.getElementById((hand == 1)?"rightHand":"leftHand").innerHTML = player.hand[hand];
    document.getElementById((hand == 1)?"rightHand":"leftHand").style.color = "white";
}
//抛弃
putItem = (hand) => {
    if((map[focusTop][focusLeft] == 0 || blockList[map[focusTop][focusLeft]].cover == true) && player.hand[hand] != "空"){
        map[focusTop][focusLeft] = player.hand[hand];
        throwItem(hand);
        Rendering();
    }
}
//放置
if(!localStorage.world)localStorage.world = "{}";
var worldList = JSON.parse(localStorage.world);
save = (mode) => {
    var worldName = document.getElementById("worldName").value;
    if(worldList[worldName] && mode != "auto"){
        if(confirm("发现一个同名世界，是否要覆盖") != true)return 0;
    }
    player.worldName = worldName
    worldList[worldName] = {
        "map":map,
        "player":player,
        "mapSize":mapSize
    }
    localStorage.world = JSON.stringify(worldList);
    document.getElementById("save").innerHTML = "保存完毕✔";
    setTimeout(()=>{document.getElementById("save").innerHTML = ""},5000)
}
player.worldName = "世界" + (Object.keys(worldList).length + 1)
//保存世界
delectWorld = (world) => {
    if(confirm(`确定要删除 "${Object.keys(worldList)[world]}" 吗`)){
        delete worldList[Object.keys(worldList)[world]];
        localStorage.world = JSON.stringify(worldList);
        location.reload();
    }
}
Object.keys(worldList).forEach((item,index)=>{
    document.getElementById("select").innerHTML += `<button onclick="start(${index})" style="width:80%">${item}</button>
    <button onclick="delectWorld(${index})" style="width: 19%">删除</button><br/><br/>`
})