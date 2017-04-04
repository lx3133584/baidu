(function () {
    var getClient = function () {//获得当前视图窗口的位置和宽高
        return {
            top: document.documentElement.scrollTop || document.body.scrollTop,
            left: document.documentElement.scrollLeft || document.body.scrollLeft,
            height: document.documentElement.clientHeight || document.body.clientHeight,
            width: document.documentElement.clientWidth || document.body.clientWidth
        }
    }
    var getSubClient = function (element) {//获得触发懒加载元素的位置和宽高
        var sub = {
            top: element.offsetTop,
            left: element.offsetLeft,
            height: element.offsetHeight,
            width: element.offsetWidth,
            p: element.offsetParent
        }
        while (sub.p) {//通过元素与上级元素偏移的和计算元素相对于文档的坐标
            sub.top += sub.p.offsetTop;
            sub.left += sub.p.offsetLeft;
            sub.p = sub.p.offsetParent;
        }
        return sub
    }
    var intersect = function (client, subClient) {//计算元素与视图窗口是否相交
        client.center = {
            x: client.left + client.width / 2,
            y: client.top + client.height / 2
        }
        subClient.center = {
            x: subClient.left + subClient.width / 2,
            y: subClient.top + subClient.height / 2
        }
        //如果在X轴和Y轴上，两个矩形中心点的坐标差小于两个矩形边长的一半则两个矩形相交
        return Math.abs(client.center.x - subClient.center.x) < client.width / 2 + subClient.width / 2 && Math.abs(client.center.y - subClient.center.y) < client.height / 2 + subClient.height / 2
    }
    window.lazyLoadList = [];//待触发懒加载元素的队列
    window.lazyLoad = function (callback) {
        window.onscroll = function () {
            if (lazyLoadList != []) {
                if (intersect(getClient(), getSubClient(lazyLoadList[0]))) {
                    callback();
                    lazyLoadList.shift();//处理完把元素从队列删除
                }
            }
        }
    }
})()