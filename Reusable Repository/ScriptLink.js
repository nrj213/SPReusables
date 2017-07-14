// Summary: Method for linking a JS file to the masterpage.
// Parameters:
//      title: Title of the script link.
//      scriptPath: Path of the script file.
var addLink = function (title, fileName, filePath) {
    var _ctx = SP.ClientContext.get_current(),
        oWeb = _ctx.get_web(),
        oCustActions = oWeb.get_userCustomActions(),
        newUserCustomAction = oCustActions.add();
    newUserCustomAction.set_location('ScriptLink');
    newUserCustomAction.set_scriptBlock('RegisterSod("' +
            fileName + '","' + filePath + '");' +
            'SP.SOD.executeFunc("' + fileName + '", null, null);');
    newUserCustomAction.set_title(title);
    newUserCustomAction.set_sequence(1000);
    newUserCustomAction.update();

    function addLinkSuccess() {
        alert("ScriptLink successfully added!");
    }
    function addLinkError(sender, args) {
        sender = sender;
        alert('ScriptLink adding failed');
    }
    _ctx.executeQueryAsync(addLinkSuccess, addLinkError);
};

// Summary: Method for unlinking a JS file from the masterpage.
// Parameters:
//      title: Title of the script link.
var removeLink = function (title) {
    var _ctx = SP.ClientContext.get_current(),
        oWeb = _ctx.get_web(),
        oCustActions = oWeb.get_userCustomActions();
    _ctx.load(oCustActions);

    function removeLinkSuccess() {
        function pendingSuccess() {
            alert("ScriptLink successfully removed!");
        }
        function pendingError(sender, args) {
            sender = sender;
            alert('ScriptLink removal failed');
        }
        if (oCustActions !== null && oCustActions.get_count() > 0) {
            var actionEnum = oCustActions.getEnumerator(),
                objToDelete = null,
                curAction = null;
            while (actionEnum.moveNext()) {
                curAction = actionEnum.get_current();

                if (curAction.get_title() === title) {
                    objToDelete = curAction;
                    break;
                }
            }
            if (objToDelete) {
                objToDelete.deleteObject();
            }
            else {
                alert('ScriptLink with given title not present!');
            }
            if (_ctx.get_hasPendingRequest()) {
                _ctx.executeQueryAsync(pendingSuccess, pendingError);
            }
        }
    }
    function removeLinkError(sender, args) {
        sender = sender;
        alert('ScriptLink removal failed');
    }
    _ctx.executeQueryAsync(removeLinkSuccess,
            removeLinkError);
};

// Summary: Method for getting the details of all script links.
// Parameters: None
var listLinks = function () {
    var _ctx = SP.ClientContext.get_current(),
        oWeb = _ctx.get_web(),
        oCustActions = oWeb.get_userCustomActions(),
        actionEnum = null,
        curAction = null;
    _ctx.load(oCustActions);

    function listLinksSuccess() {
        if (oCustActions !== null && oCustActions.get_count() > 0) {
            actionEnum = oCustActions.getEnumerator();
            while (actionEnum.moveNext()) {
                curAction = actionEnum.get_current();
                console.log(curAction.get_title());
            }
        }
        else {
            alert('No ScriptLinks present!');
        }
    }
    function listLinksError(sender, args) {
        sender = sender;
        alert('ScriptLink listing failed');
    }
    _ctx.executeQueryAsync(listLinksSuccess, listLinksError);
};