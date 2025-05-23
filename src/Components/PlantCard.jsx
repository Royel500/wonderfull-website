import React from 'react';
import { Link } from 'react-router'; 
import Swal from 'sweetalert2';

const PlantCard = ({ card, plant, setPlant }) => {

  const { _id, name,difficulty, plantType, image ,availability } = card;

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
            Swal.fire("Deleted!", "Your plant has been deleted.", "success");

            const remaining = plant.filter(p => p._id !== _id);
            setPlant(remaining);
          }
        });
      }
    });
  };

  return (
    <div className="card grid grid-cols-1 justify-end lg:grid-cols-3 bg-base-100 border-2 shadow-sm">
      <figure>
        <img src={image} alt={name} className="h-50  w-60 rounded-2xl p-2" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">Title: {name}</h2>
        <p><strong> PlantType:</strong> {plantType}</p>
        <p> <strong>Difficulty: </strong>  {difficulty}</p>
        <p> <strong> Availability: </strong> {availability}</p>
      </div>

      <div className="join join-vertical space-y-2 justify-center p-4">
        <Link to={`/details/${_id}`}>
         <button className="btn join-item w-full bg-gradient-to-r
          from-green-300 via-purple-500 to-pink-500 text-white border-none">
  See more..
</button>

        </Link>
        <Link to={`/update/${_id}`}>
        <button className="btn join-item  w-full bg-gradient-to-r
         from-red-500  to-green-500 text-white border-none">
  Edit
</button>

        </Link>
        <button onClick={() => handleDelete(_id)} className="btn join-item w-full bg-gradient-to-r
         from-green-500 via-purple-500 to-red-500 text-white border-none">
          X
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
