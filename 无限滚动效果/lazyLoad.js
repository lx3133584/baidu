(function () {
    var getClient = function () {//获得当前视图窗口的位置和宽高
        return {
            top: document.documentElement.scrollTop || document.body.scrollTop,
            left: document.documentElement.scrollLeft || document.body.scrollLeft,
            height: document.documentElement.clientHeight || document.body.clientHeight,
            width: document.documentElement.clientWidth || document.body.clientWidth
        }
    }
    var getSubClient = function (element) {
        var sub = {
            top: element.offsetTop,
            left: element.offsetLeft,
            height: element.offsetHeight,
            width: element.offsetWidth,
            p: element.offsetParent
        }
        while (sub.p) {
            sub.top += sub.p.offsetTop;
            sub.left += sub.p.offsetLeft;
            sub.p = sub.p.offsetParent;
        }
        return sub
    }
    var intersect = function (client, subClient) {
        client.center = {
            x: client.left + client.width / 2,
            y: client.top + client.height / 2
        }
        subClient.center = {
            x: subClient.left + subClient.width / 2,
            y: subClient.top + subClient.height / 2
        }
        return Math.abs(client.center.x - subClient.center.x) < client.width / 2 + subClient.width / 2 && Math.abs(client.center.y - subClient.center.y) < client.height / 2 + subClient.height / 2
    }
    window.lazyLoadList = [];
    window.lazyLoad = function (callback) {
        window.onscroll = function () {
            console.log(lazyLoadList)
            if (lazyLoadList != []) {
                if (intersect(getClient(), getSubClient(lazyLoadList[0]))) {
                    callback();
                    lazyLoadList.shift();
                }
            }
        }
    }
})()