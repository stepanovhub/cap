function fillGroups(){
    for (var i = 0; i < Data.groups.length; i++){
        var g = Data.groups[i]
        var str = "<tr>";
        str += '<th scope="row"><a href="' + Data.host + '/group.html?group_id=' + g.id + '" target=_blank>' + g.name + '</a></th>';
        str += '<td>' + g.city + '</td>';
        str += '<td>' + (g.business_year_income_from + g.business_year_income_to)/2 + '</td>';
        str += '<td>' + g.max_num_members + '</td>';
        str += '<td><button>Вступить</button></td>';
        str += '</tr>';
        $("#table-groups").append(str);
    }
    
}

var Data = {
    host: "http://46.101.100.228:8082",
    groups:null,
    methods: {
        groups: {
            type: "GET",
            path: "/api/groups/"
        },
        group: {
            type: "GET",
            path: "/api/groups/ID"
        },
        joingroup: {
            type: "POST",
            path: "/api/members/"
        },
        membersingroup: {
            type: "GET",
            path: "/api/members/?group=1"
        },
        creategroup: {
            type: "POST",
            path: "/api/groups/"
        },
        becomemoderator: {
            type: "POST",
            path: "/api/moders/"
        }
    },
    getGroups: function () {
        $.ajax({
            url: Data.host + Data.methods.groups.path,
            success: function(data){
                Data.groups = data;
                fillGroups();
            },
            error: function(err) {
                alert("error" + err);
            }
        });
    }
}
