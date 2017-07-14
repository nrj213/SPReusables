var addSlideOutMenu = function() {
        var slideOutMenu = '<div id="menuToggle">' +
                            '<input type="checkbox" />' +
                            '<span class="btn"></span>' +
                            '<span class="btn"></span>' +
                            '<span class="btn"></span>' +
                            
                            '<ul id="menu">' +
                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-assignment-initiation.png"></span>' +
                                            '<span class="main-name">Assignment Initiation</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-Payroll-instruction.png"></span>' +
                                            '<span class="main-name">Payroll Instruction Form (PIF)</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Authorisation%20or%20Deauthorisation.aspx">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-authorisation.png"></span>' +
                                            '<span class="main-name">Authorisation/De-authorisation</span>' +
                                        '</a>' +
                                        '<span class="glyphicon glyphicon-chevron-down arrow"></span>' +
                                    '</div>' +
                                    '<div class="menu-item-content">' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Authorisation-Deauthorisation/Assignee%20Authorisation.aspx">' +
                                                '<span class="glyphicon glyphicon-ok sub-icon"></span>' +
                                                '<span class="sub-name">Assignee Authorisation</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Authorisation-Deauthorisation/Assignee%20De-authorisation.aspx">' +
                                                '<span class="glyphicon glyphicon-ok sub-icon"></span>' +
                                                '<span class="sub-name">Assignee De-authorisation</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Authorisation-Deauthorisation/Non-compliant%20Assignee%20De-authorisation.aspx">' +
                                                '<span class="glyphicon glyphicon-ok sub-icon"></span>' +
                                                '<span class="sub-name">Non-compliant Assignee De-authorisation</span>' +
                                            '</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-compensation-database.png"></span>' +
                                            '<span class="main-name">Compensation</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-balance-settlement.png"></span>' +
                                            '<span class="main-name">Balancing Settlement</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/HTS.aspx">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-HTS-SLS.png"></span>' +
                                            '<span class="main-name">HTS & SLS</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-Metrics.png"></span>' +
                                            '<span class="main-name">Metrics</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Analytics.aspx">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-Analytics.png"></span>' +
                                            '<span class="main-name">Analytics</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Regional%20Management.aspx">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-regional-management.png"></span>' +
                                            '<span class="main-name">Regional Management</span>' +
                                        '</a>' +
                                        '<span class="glyphicon glyphicon-chevron-down arrow"></span>' +
                                    '</div>' +
                                    '<div class="menu-item-content">' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Regional-Management/Global.aspx">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">Global</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Regional-Management/Asia-Pac.aspx">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">Asia-Pac</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Regional-Management/Americas.aspx">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">Americas</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Regional-Management/EMEIA.aspx">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">EMEIA</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Regional-Management/Sub-Saharan%20Africa.aspx">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">Sub-Saharan Africa</span>' +
                                            '</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-out-os-scope-database.png"></span>' +
                                            '<span class="main-name">Out Of Scope (OOS)</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="' + EY.IBMPAS.siteUrl + '/SitePages/Library.aspx">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-Document-library.png"></span>' +
                                            '<span class="main-name">Library</span>' +
                                        '</a>' +
                                        '<span class="glyphicon glyphicon-chevron-down arrow"></span>' +
                                    '</div>' +
                                    '<div class="menu-item-content">' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fsites%2FPASKeySpaceDev%2FShared%20Documents%2FPolicy">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">Policy</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fsites%2FPASKeySpaceDev%2FShared%20Documents%2FCompensation%20Metrices">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">Compensation Matrices</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fsites%2FPASKeySpaceDev%2FShared%20Documents%2FTechnical%20Positions">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">Technical Positions</span>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="content-item">' +
                                            '<a href="' + EY.IBMPAS.siteUrl + '/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fsites%2FPASKeySpaceDev%2FShared%20Documents%2FCompliance%20Calendar">' +
                                                '<span class="glyphicon glyphicon-globe sub-icon"></span>' +
                                                '<span class="sub-name">Compliance Calendars</span>' +
                                            '</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-EY-GOES.png"></span>' +
                                            '<span class="main-name">Global Equity</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-TRAC.png"></span>' +
                                            '<span class="main-name">Travel Risk and Compliance</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-Tax-cost-estimate.png"></span>' +
                                            '<span class="main-name">Cost Estimates</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +

                                '<li>' +
                                    '<div class="menu-item-name">' +
                                        '<a href="#">' +
                                            '<span class="main-icon"><img src="' + EY.IBMPAS.siteUrl + '/HomeNavigation/w-social-security.png"></span>' +
                                            '<span class="main-name">Social Security</span>' +
                                        '</a>' +
                                    '</div>' +
                                '</li>' +
                            '</ul>' +
                        '</div>';
        if(window.location.href.indexOf('IsDlg=1') < 0){
            $(slideOutMenu).insertBefore(".contentwrapper");
        }
        
        $('.menu-item-content').hide(500);
        $('.menu-item-name .arrow').click(function () {
            $('.menu-item-name .arrow').removeClass('glyphicon-chevron-up');
            $('.menu-item-name .arrow').addClass('glyphicon-chevron-down');
            $('.menu-item-content').hide(500);
            if ($(this).attr('class').indexOf('active') >= 0) {
                $(this).parent().next().hide(500);
                $('.menu-item-name .arrow').removeClass("active");
                $(this).removeClass('glyphicon-chevron-up');
                $(this).addClass('glyphicon-chevron-down');    
            }
            else {
                $('.menu-item-name .arrow').removeClass("active");
                $(this).addClass('glyphicon-chevron-up');
                $(this).removeClass('glyphicon-chevron-down');
                $(this).addClass("active");
                $(this).parent().next().show(500);
            }
        });
    };