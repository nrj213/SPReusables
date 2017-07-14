(function () {
    'use strict';
    Type.registerNamespace('EY.SPSC');

    // Summary: Method for displaying the Testimonial SP modal dialog box.
    // Parameters: 
    //      options: Parameters for the modal dialog box.
    EY.SPSC.showTestimonialModal = function (title, id, list) {
        ExecuteOrDelayUntilScriptLoaded(function () {
            SP.UI.ModalDialog.showModalDialog({
                title: title,
                url: _spPageContextInfo.webAbsoluteUrl + '/Lists/' + list + '/DispForm.aspx?ID=' + id
            });
        }, 'sp.ui.dialog.js');
        return false;
    };

    // Summary: Method for displaying the Testimonial SP modal dialog box.
    // Parameters: 
    //      options: Parameters for the modal dialog box.
    EY.SPSC.showAllTestimonials = function (title, list) {
        ExecuteOrDelayUntilScriptLoaded(function () {
            SP.UI.ModalDialog.showModalDialog({
                title: title,
                url: _spPageContextInfo.webAbsoluteUrl + '/Lists/' + list + '/JSLink.aspx',
                width: 1000
            });
        }, 'sp.ui.dialog.js');
        return false;
    };

    // Summary: Method for changing the default CSR of list view.
    // Parameters: None
    EY.SPSC.render = function () {
        var header = '<div class="testimonial-wrapper">' +
                        '<div class="testimonial-header-wrapper">' +
                            '<div>Testimonials</div>' +
                            '<div>&nbsp;</div>' +
                        '</div>' +
                        '<div class="testimonial-content">',
            footer = '</div>' +
                        '</div>',
            testimonials = '';

        function itemfun(ctx) {
            if (ctx.ListTitle == 'Testimonials') {
                var item = ctx.CurrentItem,
                    id = item.ID,
                    title = 'Testimonial',
                    appreciator = (item.Appreciator !== '') ? item.Appreciator[0] : '',
                    testimonial = item.Testimonial,
                    func = "EY.SPSC.showTestimonialModal('" + title + "'," + id + ", 'Testimonials')",
                    viewAllFunc = "EY.SPSC.showAllTestimonials('Testimonials', 'Testimonials')";

                if ((testimonial.length > 0) && ($(testimonial).text().length > 200)) {
                    testimonial = $(testimonial).text().substr(0, 200) + '...<a class="read-more" href="#" onclick="' + func + '">(Read More)</a>';
                }

                if (ctx.CurrentItemIdx === 0) {
                    testimonials += '<div class="testimonial-item">' +
                                        '<div class="left"><img src="../SiteAssets/images/home/testimonials/icon_left_testimonial.png" /></div>' +
                                        '<div class="middle">' +
                                            '<div class="text">' + testimonial + '</div>' +
                                            '<div class="author-wrapper">' +
                                                '<div class="img"><img src="' + ((appreciator !== '' && appreciator.picture !== '') ? appreciator.picture : '../SiteAssets/images/home/testimonials/person-placeholder.png') + '"></div>' +
                                                '<div class="details">' +
                                                    '<div>' + ((appreciator !== '') ? appreciator.title : '') + '</div>' +
                                                    '<div>' + ((appreciator !== '') ? appreciator.jobTitle : '') + ((appreciator !== '') ? (', ' + appreciator.department) : '') + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="right">&nbsp;</div>' +
                                    '</div>';
                }

                else if (ctx.CurrentItemIdx === ctx.ListData.Row.length - 1) {
                    testimonials += '<div class="testimonial-item">' +
                                        '<div class="left">&nbsp;</div>' +
                                        '<div class="middle">' +
                                            '<div class="text">' + testimonial + '</div>' +
                                            '<div class="author-wrapper">' +
                                                '<div class="img"><img src="' + ((appreciator !== '' && appreciator.picture !== '') ? appreciator.picture : '../SiteAssets/images/home/testimonials/person-placeholder.png') + '"></div>' +
                                                '<div class="details">' +
                                                    '<div>' + ((appreciator !== '') ? appreciator.title : '') + '</div>' +
                                                    '<div>' + ((appreciator !== '') ? appreciator.jobTitle : '') + ((appreciator !== '') ? (', ' + appreciator.department) : '') + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="right">' +
                                            '<img src="../SiteAssets/images/home/testimonials/icon_right_testimonial.png" />' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="view-all"><a onclick="' + viewAllFunc + '">&lt;View All&gt;</a></div>';
                    return header + testimonials + footer;
                }

                else {
                    testimonials += '<div class="testimonial-item">' +
                                        '<div class="left">&nbsp;</div>' +
                                        '<div class="middle">' +
                                            '<div class="text">' + testimonial + '</div>' +
                                            '<div class="author-wrapper">' +
                                                '<div class="img"><img src="' + ((appreciator !== '' && appreciator.picture !== '') ? appreciator.picture : '../SiteAssets/images/home/testimonials/person-placeholder.png') + '"></div>' +
                                                '<div class="details">' +
                                                    '<div>' + ((appreciator !== '') ? appreciator.title : '') + '</div>' +
                                                    '<div>' + ((appreciator !== '') ? appreciator.jobTitle : '') + ((appreciator !== '') ? (', ' + appreciator.department) : '') + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="right">&nbsp;</div>' +
                                    '</div>';
                }
            }

            return '';
        }

        Type.registerNamespace('itemCtx');
        Type.registerNamespace('itemCtx.Templates');
        itemCtx.Templates.Header = '<div>';
        itemCtx.Templates.Item = itemfun;
        itemCtx.Templates.Footer = '</div>';
        itemCtx.ListTemplateType = 100;
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(itemCtx);
    };

    EY.SPSC.render();

}());