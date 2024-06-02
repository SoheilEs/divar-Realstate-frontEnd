export const filterData=(data, slug)=>{
    const filteredData = data?.filter(item => item.slug === slug)
    if(!slug) return data
    return filteredData
}
