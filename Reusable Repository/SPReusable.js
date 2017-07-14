(function () {
    "use strict";
    Type.registerNamespace('SPReusable');

    // Summary: Method for displaying the SP modal dialog box.
    // Parameters: 
    //      options: Parameters for the modal dialog box.
    SPReusable.popup = function (options) {
        ExecuteOrDelayUntilScriptLoaded(function () {
            SP.UI.ModalDialog.showModalDialog(options);
        }, 'sp.ui.dialog.js');
        return false;
    };

    // Summary: Method for showing the loading preloader animation.
    // Parameters: None
    SPReusable.preloader = {
        loading: null,
        // Summary: Method for starting the loading preloader animation.
        // Parameters: None
        startLoading: function (msg) {
            var funThis = this;
            msg = (msg !== undefined) ? msg : "Processing...";
            function start() {
                funThis.loading = SP.UI.ModalDialog
                    .showWaitScreenWithNoClose('', msg);
            }
            if (this.loading === null) {
                ExecuteOrDelayUntilScriptLoaded(start, 'sp.ui.dialog.js');
            }
        },
        // Summary: Method for closing the loading preloader animation.
        // Parameters: None
        endLoading: function () {
            if (this.loading !== null) {
                this.loading.close();
                this.loading = null;
            }
        }
    };

    // Summary: Method for showing notifications.
    // Parameters:
    //      msg: Notification message to be shown.
    //      delay: Time for which the notification has to be shown.
    SPReusable.notify = function (msg, delay) {
        ExecuteOrDelayUntilScriptLoaded(function () {
            var notifyId = SP.UI.Notify.addNotification(msg, true);
            setTimeout(function () {
                SP.UI.Notify.removeNotification(notifyId);
            }, delay);
        }, 'sp.ui.dialog.js');
    };

    // Summary: Method for showing status.
    // Parameters:
    //      msg: Status message to be shown.
    //      status: Status of the message (Green-Good, Yellow-Warning, Red-Danger, Others-Alert).
    //      delay: Time for which the notification has to be shown.
    SPReusable.status = function (msg, status, delay) {
        ExecuteOrDelayUntilScriptLoaded(function () {
            var statusId = SP.UI.Status.addStatus(msg);
            SP.UI.Status.setStatusPriColor(statusId, status);
            setTimeout(function () {
                SP.UI.Status.removeStatus(statusId);
            }, delay);
        }, 'sp.ui.dialog.js');
    };

    // Summary: Method for linking a JS file to the masterpage.
    // Parameters:
    //      title: Title of the script link.
    //      scriptPath: Path of the script file.
    SPReusable.addLink = function (title, fileName, filePath) {
        SPReusable.preloader.startLoading();
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
            SPReusable.preloader.endLoading();
            SPReusable.status("ScriptLink successfully added!", 'green', 4000);
        }
        function addLinkError(sender, args) {
            sender = sender;
            SPReusable.preloader.endLoading();
            SPReusable.status('ScriptLink addition failed because ' +
                        args.get_message(), 'red', 4000);
        }
        _ctx.executeQueryAsync(addLinkSuccess, addLinkError);
    };

    // Summary: Method for unlinking a JS file from the masterpage.
    // Parameters:
    //      title: Title of the script link.
    SPReusable.removeLink = function (title) {
        SPReusable.preloader.startLoading();
        var _ctx = SP.ClientContext.get_current(),
            oWeb = _ctx.get_web(),
            oCustActions = oWeb.get_userCustomActions();
        _ctx.load(oCustActions);

        function removeLinkSuccess() {
            function pendingSuccess() {
                SPReusable.preloader.endLoading();
                SPReusable.status("ScriptLink successfully removed!", 'green', 4000);
            }
            function pendingError(sender, args) {
                sender = sender;
                SPReusable.preloader.endLoading();
                SPReusable.status('ScriptLink removal failed because ' +
                    args.get_message(), 'red', 4000);
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
                    SPReusable.preloader.endLoading();
                    SPReusable.status('ScriptLink with given title not present!', 'yellow', 4000);
                }
                if (_ctx.get_hasPendingRequest()) {
                    _ctx.executeQueryAsync(pendingSuccess, pendingError);
                }
            }
        }
        function removeLinkError(sender, args) {
            sender = sender;
            SPReusable.preloader.endLoading();
            SPReusable.status('ScriptLink removal failed because ' +
                args.get_message(), 'red', 4000);
        }
        _ctx.executeQueryAsync(removeLinkSuccess,
                removeLinkError);
    };

    // Summary: Method for getting the details of all script links.
    // Parameters: None
    SPReusable.listLinks = function () {
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
                    SPReusable.status(curAction.get_title(), 'green', 4000);
                }
            }
            else {
                SPReusable.status('No ScriptLinks present!', 'blue', 4000);
            }
        }
        function listLinksError(sender, args) {
            sender = sender;
            SPReusable.status('ScriptLink listing failed because ' +
                args.get_message(), 'red', 4000);
        }
        _ctx.executeQueryAsync(listLinksSuccess, listLinksError);
    };

    // Summary: Method for opening default mail program.
    // Parameters:
    //      to: Receiver email address/addresses.
    //      cc: Carbon copy email address/addresses.
    //      bcc: Blind carbon copy email address/addresses.
    //      subject: Subject of the mail.
    //      body: Body of the mail.
    SPReusable.openMail = function (to, cc, bcc, subject, body) {
        var mail = 'mailto:',
            a = document.createElement('a');

        if (to != undefined) {
            mail += to + '?';
        }
        if (subject != undefined && subject != '') {
            mail += 'subject=' + encodeURIComponent(subject);
        }
        if (body != undefined && body != '') {
            mail += '&body=' + encodeURIComponent(body);
        }
        if (cc != undefined && cc != '') {
            mail += '&cc=' + cc;
        }
        if (bcc != undefined && bcc != '') {
            mail += '&bcc=' + bcc;
        }
        a.href = mail;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Summary: Method for calling REST/Search API service.
    // Parameters:
    //      reqUrl: Request URL.
    //      succFunc: Success callback function.
    //      errFunc: Error callback function.
    SPReusable.callService = function (reqUrl, succFunc, errFunc) {
        $.getJSON(reqUrl)
        .done(succFunc)
        .fail(errFunc);
    };

    // Summary: Method for fetching current user's details.
    // Parameters:
    //      succFunc: Success callback function.
    //      errFunc: Error callback function.
    SPReusable.getUserInfo = function (callBackFunc) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                var userInfo = {};
                if (data.d != undefined) {
                    userInfo['AccountName'] = data.d.AccountName;
                    userInfo['DisplayName'] = data.d.DisplayName;
                    userInfo['Email'] = data.d.Email;
                    userInfo['PersonalUrl'] = data.d.PersonalUrl;
                    userInfo['PictureUrl'] = data.d.PictureUrl;
                    userInfo['Title'] = data.d.Title;
                    userInfo['UserUrl'] = data.d.UserUrl;
                }
                if ((data.d.UserProfileProperties.results != undefined) && (data.d.UserProfileProperties.results.length > 0)) {
                    $.each(data.d.UserProfileProperties.results, function (index, value) {
                        userInfo[value.Key] = value.Value;
                    });
                }
                callBackFunc(userInfo);
            },
            error: function () {
                callBackFunc({});
            }
        });
    };

    // Summary: Method for displaying people picker fields.
    // Parameters:
    //      person: People picker filed data.
    //      type: Type of the rendering.
    SPReusable.peoplePicker = function (person, type) {
        if((person !== undefined) && (type !== undefined)){
            var siteDomain = _spPageContextInfo.siteAbsoluteUrl.substring(0, _spPageContextInfo.siteAbsoluteUrl.indexOf('sites'));
            switch (type) {
                case 1: return '<span class="ms-verticalAlignTop ms-noWrap ms-displayInlineBlock"><span class="ms-imnSpan"><span class="ms-spimn-presenceWrapper ms-imnImg ms-spimn-imgSize-10x10"><img name="imnmark" title="" class="ms-spimn-img ms-spimn-presence-online-10x10x32" id="imn_peoplePicker1' + Math.random() + ',type=sip" alt="Offline" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"></span></span><span class="ms-noWrap ms-imnSpan"><img name="imnmark" title="" class=" ms-hide" id="imn_peoplePicker2' + Math.random() + ',type=sip" alt="Offline" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1">' + person[0].title + '</span></span>';
                case 2: return '<div class="ms-tableRow"><div class="ms-tableCell"><span class="ms-imnSpan"><span class="ms-spimn-presenceWrapper ms-spimn-imgSize-5x36"><img name="imnmark" title="" class="ms-spimn-img ms-spimn-presence-online-5x36x32" id="imn_peoplePicker1' + Math.random() + ',type=sip" alt="Offline" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"></span></span></div><div class="ms-tableCell ms-verticalAlignTop"><div class="ms-peopleux-userImgDiv"><span class="ms-imnSpan"><img name="imnmark" title="" class=" ms-hide" id="imn_peoplePicker2' + Math.random() + ',type=sip" alt="Offline" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"><span class="ms-peopleux-userImgWrapper" style="width: 36px; height: 36px;"><img class="ms-peopleux-userImg" style="clip: rect(0px, 36px, 36px, 0px); min-height: 36px; min-width: 36px; max-width: 36px;" alt=" ' + person[0].title + '" src="' + person[0].picture + '"></span></span></div></div><div class="ms-tableCell ms-peopleux-userdetails ms-noList"><ul style="max-width: 150px;"><li><div class="ms-noWrap"><span class="ms-noWrap ms-imnSpan"><img name="imnmark" title="" class=" ms-hide" id="imn_peoplePicker3' + Math.random() + ',type=sip" alt="Available" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1">' + person[0].title + '</span></div></li><li><div title="' + person[0].jobTitle + ', ' + person[0].department + '" class="ms-metadata ms-textSmall ms-peopleux-detailuserline">' + person[0].jobTitle + ', ' + person[0].department + '</div></li></ul></div></div>';
                case 3: return '<div class="ms-tableRow"><div class="ms-tableCell"><span class="ms-imnSpan"><span class="ms-spimn-presenceWrapper ms-spimn-imgSize-5x36"><img name="imnmark" title="" class="ms-spimn-img ms-spimn-presence-online-5x36x32" id="imn_peoplePicker1' + Math.random() + ',type=sip" alt="Offline" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"></span></span></div><div class="ms-tableCell ms-verticalAlignTop"><div class="ms-peopleux-userImgDiv"><span class="ms-imnSpan"><img name="imnmark" title="" class=" ms-hide" id="imn_peoplePicker2' + Math.random() + ',type=sip" alt="Available" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"><span class="ms-peopleux-userImgWrapper" style="width: 36px; height: 36px;"><img class="ms-peopleux-userImg" style="clip: rect(0px, 36px, 36px, 0px); min-height: 36px; min-width: 36px; max-width: 36px;" alt=" ' + person[0].title + '" src="' + person[0].picture + '"></span></span></div></div></div>';
                case 4: return '<div class="ms-tableRow"><div class="ms-tableCell"><span class="ms-imnSpan"><span class="ms-spimn-presenceWrapper ms-spimn-imgSize-5x48"><img name="imnmark" title="" class="ms-spimn-img ms-spimn-presence-online-5x48x32" id="imn_peoplePicker1' + Math.random() + ',type=sip" alt="Offline" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"></span></span></div><div class="ms-tableCell ms-verticalAlignTop"><div class="ms-peopleux-userImgDiv"><span class="ms-imnSpan"><img name="imnmark" title="" class=" ms-hide" id="imn_peoplePicker2' + Math.random() + ',type=sip" alt="Available" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"><span class="ms-peopleux-userImgWrapper" style="width: 48px; height: 48px;"><img class="ms-peopleux-userImg" style="clip: rect(0px, 48px, 48px, 0px); min-height: 48px; min-width: 48px; max-width: 48px;" alt=" ' + person[0].title + '" src="' + person[0].picture + '"></span></span></div></div></div>';
                case 5: return '<div class="ms-tableRow"><div class="ms-tableCell"><span class="ms-imnSpan"><span class="ms-spimn-presenceWrapper ms-spimn-imgSize-8x72"><img name="imnmark" title="" class="ms-spimn-img ms-spimn-presence-online-8x72x32" id="imn_peoplePicker1' + Math.random() + ',type=sip" alt="Available" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"></span></span></div><div class="ms-tableCell ms-verticalAlignTop"><div class="ms-peopleux-userImgDiv"><span class="ms-imnSpan"><img name="imnmark" title="" class=" ms-hide" id="imn_peoplePicker2' + Math.random() + ',type=sip" alt="Available" src="' + siteDomain + '_layouts/15/images/spimn.png" sip="' + person[0].sip + '" showofflinepawn="1"><span class="ms-peopleux-userImgWrapper" style="width: 72px; height: 72px;"><img class="ms-peopleux-userImg" style="clip: rect(0px, 72px, 72px, 0px); min-height: 72px; min-width: 72px; max-width: 72px;" alt=" ' + person[0].title + '" src="' + person[0].picture + '"></span></span></div></div></div>';
                default: return '';
            }
        }
        else {
            return '';
        }
    };

    // Summary: Method for checking whether current user is present in a SharePoint group.
    // Parameters:
    //      groupName: Name of SP group.
    //      callBackFunc: Callback function.
    SPReusable.checkGroupMembership = function (groupName, callBackFunc) {
        function isCurrentUserMemberOfGroup(groupName, onComplete) {
            var currentContext = new SP.ClientContext.get_current();
            var currentWeb = currentContext.get_web();

            var currentUser = currentContext.get_web().get_currentUser();
            currentContext.load(currentUser);

            var allGroups = currentWeb.get_siteGroups();
            currentContext.load(allGroups);

            var group = allGroups.getByName(groupName);
            currentContext.load(group);

            var groupUsers = group.get_users();
            currentContext.load(groupUsers);

            currentContext.executeQueryAsync(onSuccess, onFailure);

            function onSuccess(sender, args) {
                var userInGroup = false;
                var groupUserEnumerator = groupUsers.getEnumerator();
                while (groupUserEnumerator.moveNext()) {
                    var groupUser = groupUserEnumerator.get_current();
                    if (groupUser.get_id() == currentUser.get_id()) {
                        userInGroup = true;
                        break;
                    }
                }
                onComplete(userInGroup);
            }
            function onFailure(sender, args) {
                onComplete(null);
            }
        }
        ExecuteOrDelayUntilScriptLoaded(function () {
            if (groupName !== "") {
                isCurrentUserMemberOfGroup(groupName, callBackFunc);
            }
        }, 'sp.ui.dialog.js');
    };

    // Summary: Method for checking whether current user has permission on the specified list/library.
    // Parameters:
    //      listName: Name of list/library.
    //      callBackFunc: Callback function.
    SPReusable.checkListMembership = function (listName, callBackFunc) {
        function isCurrentUserMemberOfList(listName, onComplete) {
            var context = SP.ClientContext.get_current(),
            web = context.get_web(),
            curUser = web.get_currentUser(),
            oList = web.get_lists().getByTitle(listName);
            context.load(curUser);
            context.load(oList, "EffectiveBasePermissions");

            function onSuccess() {
                var userInList = false;
                if (oList.get_effectiveBasePermissions()
                    .has(SP.PermissionKind.editListItems)) {
                    userInList = true;
                }
                onComplete(userInList);
            }
            function onFailure() {
                onComplete(null);
            }
            context.executeQueryAsync(onSuccess, onFailure);
        }
        ExecuteOrDelayUntilScriptLoaded(function () {
            if (listName !== "") {
                isCurrentUserMemberOfList(listName, callBackFunc);
            }
        }, 'sp.ui.dialog.js');
    };

    $(document).ready(function () {
        ProcessImn();
    });

}());