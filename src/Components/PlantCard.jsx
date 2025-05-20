import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const PlantCard = ({ card }) => {
    console.log(card)
      const { _id, name, category, plantType, image } = card;
    
      const handleDelete = (_id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:4000/plants/${_id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(res => res.json())
            .then(data => {
              if (data.deletedCount) {
                Swal.fire("Deleted!", "Your coffee has been deleted.", "success");
    
                const remaining = cofy.filter(cof => cof._id !== _id);
                setCofy(remaining);
    
              }
    
            });
          }
        });
      };
    
return (
    <div className="card card-side bg-base-100 border-2 shadow-sm">
      <figure>
        <img  src={image} alt={name} className="h-auto w-50 rounded-2xl p-2" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">Title: {name}</h2>
        <p>Chef: {plantType}</p>
        <p>Price: {category} Taka</p>
      </div>

      <div className="join join-vertical justify-center p-4">
        <Link to={`/details/${_id}`}>
          <button className="btn join-item">View</button>
        </Link>

        <Link to={`/update/${_id}`}>
          <button className="btn join-item">Edit</button>
        </Link>

        <button onClick={() => handleDelete(_id)} className="btn join-item btn-error">
          X
        </button>
      </div>
    </div>
  );
};

export default PlantCard;