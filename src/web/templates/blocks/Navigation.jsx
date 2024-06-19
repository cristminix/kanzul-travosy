import { useEffect } from 'react';

const Navigation = ({ webNavigationList }) => {
  // console.log(webNavigationList)
  const cls12 = "cls-12 dropdown inline-block relative pe-1"

  const cls29 = "cls-29 navigation-menu justify-end nav-light"
  const cls33 = "cls-33 sub-menu-item"
  const isActive = (item)=>{
    let active = item.path === "/" ? item.path === location.pathname : location.pathname.startsWith(item.path)
            if (item.path.includes("/index.html")) {
              active =
                item.path === "/"
                  ? `${item.path}/index.html` === `${location.pathname}/index.html`
                  : `${location.pathname}/index.html`.startsWith(`${item.path}/index.html`)
            }
        if(Array.isArray(item.children)){
            for(const itemChild of item.children){
                if(isActive(itemChild))
                    return true
            }
        }    
    return active
  }

  useEffect(()=>{
   
  },[])
  return (
    <div id="navigation">
      {/*<!-- Navigation Menu-->*/}
      <ul className={cls29}>
        {Array.isArray(webNavigationList) &&
          webNavigationList.map((item, index) => {
            const hasChildren =  Array.isArray(item.children)
            let active = isActive(item)
            return (
              <li key={index} className={`${active ? "active" : ""} ${hasChildren?'has-submenu parent-menu-item':''}`}>
                <a href={`${item.path}`} className={`${cls33} ${hasChildren?'twx-mr-2':''}`}>
                  {item.title}
                </a>
                {hasChildren?<>
                    <span className="menu-arrow !twx-ml-2"></span>
                    <ul className="submenu">
                    {item.children.map((itemChild,childIndex)=>{
                        return <li key={childIndex}>
                            <a href={itemChild.path} className="sub-menu-item">{itemChild.title}</a>
                        </li>
                    })}
                    </ul>
                </>:null}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Navigation