import React from 'react';
import { GET_BLOG_CATEGORIES, GET_BLOG_CATEGORIES_LIST, GET_BLOG_CONFIG } from './Blog.gql'
import { useQuery } from '@apollo/client';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';

const unflatten = (arr) => {
    let tree = [];
    let mappedArr = {};
    let arrElem;
    let mappedElem;

    for (var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        arrElem.label = arrElem.name;
        mappedArr[arrElem.category_id] = arrElem;
        mappedArr[arrElem.category_id]['children'] = [];
    }

    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            if (mappedElem.parent_id) {
                mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
            }
            else {
                tree.push(mappedElem);
            }
        }
        const unflatten = (arr) => {
            let tree = [];
            let mappedArr = {};
            let arrElem;
            let mappedElem;
        
            for (var i = 0, len = arr.length; i < len; i++) {
                arrElem = arr[i];
                arrElem.label = arrElem.name;
                mappedArr[arrElem.category_id] = arrElem;
                mappedArr[arrElem.category_id]['children'] = [];
            }
        
            for (var id in mappedArr) {
                if (mappedArr.hasOwnProperty(id)) {
                    mappedElem = mappedArr[id];
                    if (mappedElem.parent_id) {
                        mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
                    }
                    else {
                        tree.push(mappedElem);
                    }
                }
            }
            return tree;
        }}
    return tree;
}
const dataCleaning = ((categoryArray, classes, base_media_url = "") => {
    let groupCategory = [];
    groupCategory.push({
        value: 0,
        label: "All"
    })
    categoryArray.map((category, index) => {
        const item = {
            value: category.category_id,
            label: <React.Fragment key={index}>
                <img src={category.image ? `${base_media_url+category.image}` : ''} width={32} height={32} />
                <p style={{ padding: "9px 0 0 15px" }}>{category.name}</p>
            </React.Fragment>
        }
        item['className'] = classes.customOptionCategory
        groupCategory.push(item)
    })
    
    return groupCategory
})
const conditionFunc = (category) => {
    return
}
const groupCategoryHandle = ((categoryArray) => {
    const length = categoryArray.length;
    let result = [];
    for (let i = 0; i < length; i++) {
        let parent = {...categoryArray[i], children: []}
        if (!parent.parent_id) {
            for (let j = 0; j < length; j++) {
                if (categoryArray[i].parent_id == parent.category_id) {
                    parent.children.push(categoryArray[i])
                }
            }
            result.push(parent)

        }
    }
})
export const useCateTree = props => {
    const {
        data: cateData,
        loading: cateLoading,
        error: cateError
    } = useQuery(GET_BLOG_CATEGORIES_LIST, {
        variables: {
            search: "",
            pageSize: 20,
            currentPage: 1
        }
    })

    const { loading, error, data } = useQuery(GET_BLOG_CONFIG, {
        variables: {}
    })

    let dataCateTree = [];
    if (cateLoading || loading) {
        return <LoadingIndicator />
    }
    if (cateError) {
        return null
    }
    const secureBaseMediaUrl = data.storeConfig!==undefined?data.storeConfig.secure_base_media_url:""
    const baseMediaUrl = data.storeConfig!==undefined?data.storeConfig.base_media_url:""
    if (cateData && cateData.lofBlogCategoryList && cateData.lofBlogCategoryList.items) {
        dataCateTree = dataCleaning(cateData.lofBlogCategoryList.items, props, secureBaseMediaUrl)
        return {
            dataCateTree,
            cateLoading,
        }
    }
}