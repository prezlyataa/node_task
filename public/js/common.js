function getJSONFile(callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', '/structure-source', true);
    httpRequest.send();
}

var container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

var list = document.createElement('ul');
list.id = 'items';
container.appendChild(list);


getJSONFile(function(data) {

    var list = data.tree;

    function treeify(list, idAttr, parentAttr, childrenAttr) {

        if (!idAttr) idAttr = 'id';
        if (!parentAttr) parentAttr = 'parent';
        if (!childrenAttr) childrenAttr = 'children';

        var treeList = [];
        var lookup = {};

        list.forEach(function(obj) {
            lookup[obj[idAttr]] = obj;
            obj[childrenAttr] = [];
        });
        list.forEach(function(obj) {
            if (obj[parentAttr] != null) {
                lookup[obj[parentAttr]][childrenAttr].push(obj);
            } else {
                treeList.push(obj);
            }
        });
        return treeList;
    };

    var newlist = treeify(list);
    console.log(newlist);






    /*function print(newlist) {
        var newarr = [];
        for (var i = 0; i < newlist.length; i++) {
            if (newlist[i].parent === null){
                newarr.push(newlist[i]);
            }
            document.getElementById('items').innerHTML = document.getElementById('items').innerHTML + '<li class="it">' + newlist[i].id + ' ' + newlist[i].title + '</li>';
        }
    }
  /!*  function searchParent() {
        for (var i = 0; i < newarr.length; i++) {
            if (!)
        }
    }*!/

    print(newlist);*/






    /*function flattenAccounts(accounts){
        var a = [];
        for(var i=0;i<accounts.length;i++){
            var o = accounts[i];
            if(o.children){
                var c = flattenAccounts(o.children);
                if(c){
                    a = a.concat(c);
                }
            }
            a.push(o)
        }
         console.log(a);
    }
    flattenAccounts(newlist);*/









/*    var printList = function(newlist){

        for(var i=0;i< newlist.length;i++){

            if(Array.isArray(newlist[i]))
            {
                printList(newlist[i]);
            }
            else{
                document.write(newlist[i].id + " " + newlist[i].title +'<br/>');

            }
        }
    }

    printList(newlist);
    */






    function printValues(obj) {
        for (var key in obj) {
            if (typeof obj[key] === 'object') {
                printValues(obj[key]);
            }
                else {
                if (obj.hasOwnProperty('id') && obj.hasOwnProperty('title')) {
                    document.getElementById('items').innerHTML = document.getElementById('items').innerHTML + '<li class="it">' + obj[key] + '</li>';
                }
            }
        }
    }
    printValues(newlist);







    /*for (var key in obj) {
        document.getElementById('items').innerHTML = document.getElementById('items').innerHTML + '<li class="it">' + obj[key].id + " " + obj[key].title + '</li>';
    }*/

});


