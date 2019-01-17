function fillGroups() {
    for (var i = 0; i < Data.groups.length; i++) {
        var g = Data.groups[i]
        var str = "<tr>";
        //        str += '<th scope="row"><a href="' + Data.path + '/group.html?group_id=' + g.id + '" target=_blank>' + g.name + '</a></th>';
        str += '<th scope="row">';
        str += '<a href="#" data-toggle="modal" data-target="#modalGroupInfo" data-id="' + g.id + '">' + g.name + '</a></th>';
        str += '<td>' + g.city + '</td>';
        str += '<td>' + (g.business_year_income_from + g.business_year_income_to) / 2 + '</td>';
        str += '<td>' + g.max_num_members + '</td>';
        str += '<td><button>Вступить</button></td>';
        //str += '<tr id="group_"' + g.id + '><td>ijnijnijn</td></tr>';
        str += '</tr>';
        $("#table-groups").append(str);
    }
    $('#modalGroupInfo').on('shown.bs.modal', function (e) {
        var invoker = $(e.relatedTarget);
        clearGroup();
        Data.getGroup($(invoker).data("id"));
    })
}


function clearGroup(){
    $("#table-group-members").empty();
    $("#group-name").text("загрузка...");
}

function fillGroup() {
    var g = Data.group;
    $("#group-name").text("Группа " + g.name);
}

function fillGroupMembers() {
    for (var i = 0; i < Data.group.members.length; i++) {
        var m = Data.group.members[i];
        var str = "<tr>";
        str += '<td>' + m.business_kind + '</td>';
        str += '<td>' + m.business_year_income + '</td>';
        str += '<td>' + m.user.city + '</td>';
        str += '<td>' + m.role + '</td>';
        str += '</tr>';
        $("#table-group-members").append(str);
    }
}

var Data = {
    host: "http://46.101.100.228:8082",
    path: "file:///Users/step/Projects/Actual/КАП/git",
    groups: null,
    group: null,
    methods: {
        groups: {
            type: "GET",
            path: "/api/groups/"
        },
        group: {
            type: "GET",
            path: "/api/groups/"
        },
        joingroup: {
            type: "POST",
            path: "/api/members/"
        },
        membersingroup: {
            type: "GET",
            path: "/api/members/?group="
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
            success: function (data) {
                Data.groups = data;
                fillGroups();
            },
            error: function (err) {
                alert("error" + err);
            }
        });
    },
    getGroup: function (id) {
        $.ajax({
            url: Data.host + Data.methods.group.path + id,
            success: function (data) {
                Data.group = data;
                Data.getGroupMembers(Data.group.id);
                fillGroup();
            },
            error: function (err) {
                alert("error" + err);
            }
        });
    },
    getGroupMembers: function(id){
        $.ajax({
            url: Data.host + Data.methods.membersingroup.path + id,
            success: function (data) {
                Data.group.members = data;
                fillGroupMembers();
            },
            error: function (err) {
                alert("error" + err);
            }
        });
    }
}

function getUrlParam(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

$('#modalGroupInfo').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})
