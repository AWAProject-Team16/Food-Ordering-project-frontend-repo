import React from 'react'
import styles from '../css/RestaurantDetailView.module.css';
import { useParams } from 'react-router-dom';
// import { Link, Outlet } from 'react-router-dom'

export default function RestaurantDetailView(props) {
  // const result = window.location.pathname.split('/')[2]
  const result = useParams()
  const obj = props.restaurants.find(item => item.idRestaurant == result.idOfRestaurant);
  if(obj == null) {
    return <div>No matching restaurant</div>
  }
  return (
    <div>
      <div className= {styles.header}>
        IMG
      </div>
      <div className= {styles.container}>
        <div className= {styles.menu}>
          {/* { props.contacts.map(contact =>
            <Link to={ contact.id }>
              <div className="contactListElement">{contact.lastName} {contact.firstName}</div>
            </Link>
          )} */}
        </div>
        <div className= {styles.products}>

        </div>
        <div className= {styles.info}>

        </div>
      </div>
    </div>
  )
}
