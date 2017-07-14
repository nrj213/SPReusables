var documentsArray = [];
var categoryIndex = -1;
var subCategoryIndex = -1;
var documentsCount = 0;
var documentsAccordion = "";

(function () {
    var headers = "<div>";
    var footers = '</div>'
    var itemCtx = {};
    itemCtx.Templates = {};
    itemCtx.Templates.Header = headers;
    itemCtx.Templates.Group = groupfun;
    itemCtx.Templates.Item = itemfun;
    itemCtx.Templates.Footer = footers;
    itemCtx.BaseViewID = 1;
    itemCtx.ListTemplateType = 101;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(itemCtx);

})();

$(document).ready(function () {
    //Script for the sliding effect
    $(".sub-category-heading").hide();
    $(".documents").hide();
    $(".category-heading").click(function () {
        $(".category-heading").find('span').removeClass("fa-caret-down");
        $(".category-heading").find('span').addClass("fa-caret-right");
        $(".sub-category-heading").find('span').removeClass("fa-caret-down");
        $(".sub-category-heading").find('span').addClass("fa-caret-right");
        
        $(this).find('span').removeClass("fa-caret-right");
        $(this).find('span').addClass("fa-caret-down");

        if($(this).attr("class").indexOf('active') >= 0) {
            $(this).find('span').toggleClass("fa-caret-right fa-caret-down");
            $(this).nextUntil(".category-heading").hide("500");
            $(".category-heading").removeClass("active");
        }
        else {
            $(".sub-category-heading").hide("500");
            $(".documents").hide("500");
            $(".category-heading").removeClass("active");
            $(this).addClass("active");
            $(this).nextUntil(".category-heading").show("500");
            $(".documents").hide();
        }
    });
    
    $(".sub-category-heading").click(function () {
         $(".sub-category-heading").find('span').removeClass("fa-caret-down");
         $(".sub-category-heading").find('span').addClass("fa-caret-right");
         $(this).find('span').removeClass("fa-caret-right");
         $(this).find('span').addClass("fa-caret-down");
        
        if($(this).attr("class").indexOf('active') >= 0) {
            $(this).find('span').toggleClass("fa-caret-right fa-caret-down");
            
            if($(this).nextUntil(".category-heading").length < $(this).nextUntil(".sub-category-heading").length){
                $(this).nextUntil(".category-heading").hide("500");
            }
            else {
                $(this).nextUntil(".sub-category-heading").hide("500");
            }
            $(".sub-category-heading").removeClass("active");
        }
        else {
            $(".documents").hide("500");
            $(".sub-category-heading").removeClass("active");
            $(this).addClass("active");
            
            if($(this).nextUntil(".category-heading").length < $(this).nextUntil(".sub-category-heading").length){
                $(this).nextUntil(".category-heading").show("500");
            }
            else {
                $(this).nextUntil(".sub-category-heading").show("500");
            }
        }
    });
});

// Function to group documents based on category and subcategory
function groupfun(ctx, group, groupId, listItem, listSchema, level, expand) {
    if (ctx.ListTitle == "Documents") {
        if (level == 1) {
            documentsArray.push({
                category: (listItem.Category != '' ? listItem.Category : ""),
                categorySub: []
            });
            categoryIndex++;
            subCategoryIndex = -1;
        }
        if (level == 2) {
            documentsArray[categoryIndex].categorySub.push({
                subCategory: (listItem.SubCategory != '' ? listItem.SubCategory : ""),
                count: listItem['SubCategory.COUNT.group2'],
                documents: []
            });
            subCategoryIndex++;
            documentsCount += parseInt(listItem['SubCategory.COUNT.group2']);
        }
    }

    return '';
}

function itemfun(ctx) {
    documentsArray[categoryIndex].categorySub[subCategoryIndex].documents.push({
        docName: ctx.CurrentItem.FileLeafRef,
        docLink: ctx.CurrentItem.FileRef,
        icon: "/_layouts/15/images/" + ctx.CurrentItem['HTML_x0020_File_x0020_Type.File_x0020_Type.mapico'] 

    });
    
    if (documentsCount == ctx.ListData.Row.length) {

        $.each(documentsArray, function (index, value) {
            if (value.category.length > 0) {
                documentsAccordion += "<div class='category-heading'><span class='fa fa-caret-right fa-1x' style='color: rgba(254, 229, 0, 1); padding-right: 4px; font-size: 17px;'></span>" + value.category + "</div>";
            }

            value.categorySub.sort(function (a, b) {
                return b.count - a.count;
            });

            $.each(value.categorySub, function (i, v) {
                if (value.category.length > 0) {
                    documentsAccordion += "<div class='sub-category-heading'><span class='fa fa-caret-right fa-1x' style='color: rgba(254, 229, 0, 1); padding-right: 4px; font-size: 17px;'></span>" + v.subCategory + " <b>(" + v.count + ")</b>" + "</div>";
                }

                $.each(v.documents, function (x, y) {
                    if (v.subCategory.length > 0) {
                        documentsAccordion += "<div class='documents'><a href='"+ y.docLink +"'><img class='document-icon' src='" + y.icon +"'>" + y.docName + "</a></div>";
                    }
                });
            });
        });

        return documentsAccordion;
    }
    
    return '';
}



