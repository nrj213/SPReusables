(function () {
    'use strict';
    Type.registerNamespace('EY.SPSC');

    // Summary: Method for changing the default CSR of list view.
    // Parameters: None
    EY.SPSC.render = function () {
        var header = '<div class="testimonial-wrapper">' +
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
                    testimonial = item.Testimonial;

                if (ctx.CurrentItemIdx === 0) {
                    testimonials += '<div class="testimonial-item">' +
                                        '<div class="left"><img src="/sites/sharepointsolutioncenter/revamp/SiteAssets/images/home/testimonials/icon_left_testimonial.png" /></div>' +
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
                                                '<img src="/sites/sharepointsolutioncenter/revamp/SiteAssets/images/home/testimonials/icon_right_testimonial.png" />' +
                                            '</div>' +
                                        '</div>';
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
        itemCtx.Templates.Header = '<div></div>';
        itemCtx.Templates.Item = itemfun;
        itemCtx.Templates.Footer = '';
        itemCtx.ListTemplateType = 100;
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(itemCtx);
    };

    EY.SPSC.render();

}());