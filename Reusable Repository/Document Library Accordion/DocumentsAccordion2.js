var documentsArray = [];
var categoryIndex = -1;
var subCategoryIndex = -1;
var documentsCount = 0;
var documentsAccordion = "";

(function () {
    var headers = "<div class='accordion-wrapper'>";
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

// Function to group documents based on category and subcategory
function groupfun(ctx, group, groupId, listItem, listSchema, level, expand) {
    if (ctx.ListTitle == "Top Tip Documents") {
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
    
    if (ctx.CurrentItemIdx == ctx.ListData.Row.length -1 ) {
        
        documentsArray.sort(function (a, b) {
                return b.category - a.category;
            });
            
        $.each(documentsArray, function (index, value) {
            if (value.category.length > 0) {
                documentsAccordion += "<div class='category-wrapper'><div class='category-heading'>" + value.category + "</div>";
            }

            value.categorySub.sort(function (a, b) {
                return b.subCategory - a.subCategory;
            });
            
            $.each(value.categorySub, function (i, v) {
                if (value.category.length > 0) {
                    documentsAccordion += "<div class='sub-category-wrapper'><div class='sub-category-heading'>" + v.subCategory + " <b>(" + v.count + ")</b>" + "</div><div class='documents-wrapper'>";
                }
                
                $.each(v.documents, function (x, y) {
                    if (v.subCategory.length > 0) {
                        documentsAccordion += "<div class='documents'><a href='"+ y.docLink +"'><img class='document-icon' src='" + y.icon +"'>" + y.docName + "</a></div>";
                    }
                });
                if (value.category.length > 0) {
                    documentsAccordion += "</div></div>";
                }
            });
            if (value.category.length > 0) {
                documentsAccordion += "</div>";
            }
        });

        return documentsAccordion;
    }
    
    return '';
}

$(document).ready(function () {
    //Script for the sliding effect
    $(".category-heading").siblings().hide("500");
    $(".documents-wrapper").hide("500");
    
    $(".category-heading").click(function () {
        $(".category-heading").siblings().hide("500");
        $(".documents-wrapper").hide("500");
        $(".sub-category-heading").removeClass("active");

        if($(this).attr("class").indexOf('active') >= 0) {
           $(this).siblings().hide("500");
           $(".category-heading").removeClass("active");
        }
        else {
            $(".category-heading").removeClass("active");
            $(this).addClass("active");
            $(this).siblings().show("500");
        }
    });
    
    $(".sub-category-heading").click(function () {
        $(".sub-category-heading").siblings().hide("500");

        if($(this).attr("class").indexOf('active') >= 0) {
           $(this).siblings().hide("500");
           $(".sub-category-heading").removeClass("active");
        }
        else {
            $(".sub-category-heading").removeClass("active");
            $(this).addClass("active");
            $(this).siblings().show("500");
        }
    });
});

