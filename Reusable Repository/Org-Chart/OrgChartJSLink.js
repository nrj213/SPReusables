(function () {
    'use strict';
    Type.registerNamespace('EY.ITCHS');

    var header = '<div class="org-chart">' +
                    '<div class="main-wrapper">',
        body = '',
        footer = '',
        index = 0,
        flag = false;;

    // Summary: Method for overriding default item rendering.
    // Parameters: None
    EY.ITCHS.render = function () {
        function groupFun(ctx, group, groupId, listItem, listSchema, level, expand) {
            if (parseInt(listItem['Business_x0020_Unit.COUNT.group']) == 1) {
                flag = true;
            }

            index += parseInt(listItem['Business_x0020_Unit.COUNT.group']);

            if(!flag){
                body += '<div class="slice-heading-wrapper">' +
                            '<div class="heading"><span>' + listItem.Business_x0020_Unit + '</span></div>' +
                            '<div class="icon"></div>' +
                        '</div>';
            }

            return '';
        }

        function itemFun(ctx) {
            var item = ctx.CurrentItem;

            if(!flag){
                if (item.Order_x0020_Id == 0) {
                    body += '<div class="slice-content-wrapper">' +
                                '<div class="arrow-icon"></div>' +
                                    '<div class="main-row">' +
                                        '<div class="item">' +
                                            '<img src="' + ((item.Person !== '' && item.Person[0].picture !== '') ? item.Person[0].picture : '../SiteAssets/Images/org-chart/person-placeholder-img.png') + '" />' +
                                            '<div class="details-wrapper">' +
                                                '<div class="main">' +
                                                    '<div class="name">' + ((item.Person !== '') ? item.Person[0].title : 'Open') + '</div>' +
                                                    '<div class="unit">' + ((item.Unit_x0020_Name !== '') ? item.Unit_x0020_Name : '') + '</div>' +
                                                '</div>' +
                                                '<div class="sub">' +
                                                    '<div class="location">' + ((item.Location !== '') ? item.Location : '') + '</div>' +
                                                    '<div class="email">' + ((item.Person !== '') ? item.Person[0].email : '') + '</div>' +
                                                    '<div class="contact">' + ((item.Contact !== '') ? item.Contact : '') + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="sub-row">';
                }

                else if (ctx.CurrentItemIdx == index - 1) {
                    body += '<div class="item">' +
                                '<img src="' + ((item.Person !== '' && item.Person[0].picture !== '') ? item.Person[0].picture : '../SiteAssets/Images/org-chart/person-placeholder-img.png') + '" />' +
                                '<div class="details-wrapper">' +
                                    '<div class="main">' +
                                        '<div class="name">' + ((item.Person !== '') ? item.Person[0].title : 'Open') + '</div>' +
                                        '<div class="unit">' + ((item.Unit_x0020_Name !== '') ? item.Unit_x0020_Name : '') + '</div>' +
                                    '</div>' +
                                    '<div class="sub">' +
                                        '<div class="location">' + ((item.Location !== '') ? item.Location : '') + '</div>' +
                                        '<div class="email">' + ((item.Person !== '') ? item.Person[0].email : '') + '</div>' +
                                        '<div class="contact">' + ((item.Contact !== '') ? item.Contact : '') + '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                         '</div>' +
                      '</div>';
                }

                else {
                    body += '<div class="item">' +
                                '<img src="' + ((item.Person !== '' && item.Person[0].picture !== '') ? item.Person[0].picture : '../SiteAssets/Images/org-chart/person-placeholder-img.png') + '" />' +
                                '<div class="details-wrapper">' +
                                    '<div class="main">' +
                                        '<div class="name">' + ((item.Person !== '') ? item.Person[0].title : 'Open') + '</div>' +
                                        '<div class="unit">' + ((item.Unit_x0020_Name !== '') ? item.Unit_x0020_Name : '') + '</div>' +
                                    '</div>' +
                                    '<div class="sub">' +
                                        '<div class="location">' + ((item.Location !== '') ? item.Location : '') + '</div>' +
                                        '<div class="email">' + ((item.Person !== '') ? item.Person[0].email : '') + '</div>' +
                                        '<div class="contact">' + ((item.Contact !== '') ? item.Contact : '') + '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
                }
            }

            else {
                footer = '</div>' +
                             '<div class="sub-wrappper">' +
                                    '<div class="left-section">' +
                                        '<div class="icon">' +
                                            '<img src="../SiteAssets/Images/org-chart/icon_TTO.png" />' +
                                        '</div>' +
                                        '<div class="text">' + item.Business_x0020_Unit + '</div>' +
                                    '</div>' +
                                    '<div class="right-section">' +
                                        '<div class="photo">' +
                                            '<img src="' + ((item.Person !== '') ? item.Person[0].picture : '../SiteAssets/Images/org-chart/person-placeholder-img.png') + '" />' +
                                        '</div>' +
                                        '<div class="name">' + ((item.Person !== '') ? item.Person[0].title : 'Open') + '</div>' +
                                        '<div class="details">' +
                                            '<div class="email">' + ((item.Person !== '') ? item.Person[0].email : '') + '</div>' +
                                            '<div class="contact">' + ((item.Contact !== '') ? item.Contact : '') + '</div>' +
                                            '<div class="location">' + ((item.Location !== '') ? item.Location : '') + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
            }

            if (ctx.CurrentItemIdx == ctx.ListData.Row.length - 1) {
                return header + body + footer;
            }

            return '';
        }

        Type.registerNamespace('itemCtx');
        Type.registerNamespace('itemCtx.Templates');
        itemCtx.Templates.Header = '<div>';
        itemCtx.Templates.Group = groupFun;
        itemCtx.Templates.Item = itemFun;
        itemCtx.Templates.Footer = '</div>';
        itemCtx.BaseViewID = 81;
        itemCtx.ListTemplateType = 100;
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(itemCtx);
    };


    ExecuteOrDelayUntilScriptLoaded(function () {
        var oldRenderListView = RenderListView;
        //Now redefine RenderListView with our override
        RenderListView = function (ctx, webPartID) {
            if (ctx.listName == '{E61C61A0-9CB8-4CCD-8388-09CC5C5D392F}') {
                ctx.BaseViewID = 81;
            }
            //now call the original RenderListView
            ExecuteOrDelayUntilScriptLoaded(function () { oldRenderListView(ctx, webPartID) }, "SP.init.js");
        }

        EY.ITCHS.render();

    }, "ClientTemplates.js");

    EY.ITCHS.slidingActions = function () {
        $(document).ready(function () {
            $('.slice-content-wrapper').eq(0).show();
            $('.slice-heading-wrapper').eq(0).addClass("active");

            $('.slice-heading-wrapper').click(function () {
                $('div.active').next().hide(500);

                if ($(this).attr("class").indexOf('active') >= 0) {
                    $(this).next().hide(500);
                    $(".slice-heading-wrapper").removeClass("active");
                }
                else {
                    $(".slice-heading-wrapper").removeClass("active");
                    $(this).addClass("active");
                    $(this).next().show(500);
                }
            });
        });
    };

    _spBodyOnLoadFunctions.push(EY.ITCHS.slidingActions);

}());





