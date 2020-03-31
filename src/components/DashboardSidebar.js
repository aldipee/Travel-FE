import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'
import Style from 'styled-components'
import Icon from '@mdi/react'
import {
  mdiBusMultiple,
  mdiAccountGroupOutline,
  mdiCalendarMonthOutline,
  mdiFileMultipleOutline,
  mdiFileChartOutline,
  mdiArrowLeftRightBoldOutline,
  mdiAccountCheckOutline
} from '@mdi/js'

const MenuText = Style('span')`
color : #8d9498;
text-decoration : none;
`

function SidebarMenu(props) {
  console.log(props.isSuperAdmin)
  let MenuItem = [
    {
      icon: mdiFileChartOutline,
      text: 'Dashboard',
      path: '/'
    },
    {
      icon: mdiFileMultipleOutline,
      text: 'Reservations',
      path: '/reservations'
    },
    {
      icon: mdiCalendarMonthOutline,
      text: 'Schedules',
      path: '/schedules'
    },
    {
      icon: mdiBusMultiple,
      text: 'Buses',
      path: '/buses'
    }
  ]
  const AdminMenu = [
    {
      icon: mdiAccountGroupOutline,
      text: 'Agent',
      path: '/agents'
    },
    {
      icon: mdiArrowLeftRightBoldOutline,
      text: 'Routes',
      path: '/routes'
    },
    {
      icon: mdiAccountCheckOutline,
      text: 'Users',
      path: '/users'
    }
  ]

  return (
    <div>
      <ListGroup flush className="mt-5">
        {MenuItem &&
          props.isSuperAdmin &&
          MenuItem.concat(AdminMenu).map((data, index) => (
            <ListGroupItem>
              <Link to={data.path}>
                <Icon path={data.icon} size={1} color="#8d9498" />
                <MenuText>{data.text}</MenuText>
              </Link>
            </ListGroupItem>
          ))}
        {MenuItem &&
          !props.isSuperAdmin &&
          MenuItem.map((data, index) => (
            <ListGroupItem>
              <Link to={data.path}>
                <Icon path={data.icon} size={1} color="#8d9498" />
                <MenuText>{data.text}</MenuText>
              </Link>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  )
}

export default SidebarMenu
