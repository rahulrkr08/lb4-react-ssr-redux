export function formatMenus(menus: any, options: any = {}) {
  
  return menus.map((menu: any) => {

    if(menu.link.enabled) {
      
      let url = menu.link.url.split('/')
      url  = "/" + url.splice(2, url.length).join("/")   
      
      return {
        "menu":           options.menu,
        "title":          menu.link.title,
        "weight":         menu.link.weight,
        "has_children":   menu.has_children,
        "meta_data":      menu.link.meta_data,
        "options":        menu.link.options,
        "url":            url,
        "sublinks":       formatMenus(menu.subtree, options),
        "id":             `${menu.link.provider}:/${options.lang}/${menu.link.meta_data.entity_id}`
      }
    }    
  })
}