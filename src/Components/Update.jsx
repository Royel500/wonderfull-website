import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from './Context/AuthProvider';
import Swal from 'sweetalert2';

const Update = () => {
  const {user} =use(AuthContext)
    const {_id,name,description,availability, category} = useLoaderData();
   
    const handleUpdate =e=>{
      e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const tipData = Object.fromEntries(formData.entries());

    // Add user info automatically
       tipData.userName = user.displayName;
    tipData.userEmail = user.email;

    fetch(`http://localhost:4000/plants/${_id}` , {
      method:'PUT' ,
      headers:{
        'content-type':'application/json'
      },
          body:JSON.stringify(tipData)
    })
    .then(res => res.json())
    .then( data =>{
if(data.modifiedCount){
     Swal.fire({
              title: 'Success!',
              text: 'Plant tip updated successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
}
    })

    }
    return (
       <div className="mx-10 my-15">
      <div>
        <h1 className="text-4xl font italic my-5 text-blue-800 font-bold text-center">Update Tips</h1>
       
      </div>

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> <strong> Title :</strong></span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={name}
                className="input input-bordered w-full"
                placeholder="e.g., How I Grow Tomatoes Indoors"
                required
              />
            </div>

            {/* Plant Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> <strong> Plant Type/Topic : </strong></span>
              </label>
              <input
                type="text"
                name="plantType"
                defaultValue={category}
                className="input input-bordered w-full"
                placeholder="e.g., Tomatoes, Roses, Soil"
                required
              />
            </div>

            {/* Difficulty Level */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> <strong> Difficulty Level* </strong></span>
              </label>
              <select
                name="difficulty"
                className="select select-bordered w-full"
                required
              >
                <option value=""> <strong> Select difficulty </strong></option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"> <strong> Category* </strong></span>
              </label>
              <select
                name="category"
               
                className="select select-bordered w-full"
                required
              >
                <option value=""> <strong>Select category </strong> </option>
                <option value="Composting">Composting</option>
                <option value="Plant Care">Plant Care</option>
                <option value="Vertical Gardening">Vertical Gardening</option>
                <option value="Pest Control">Pest Control</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Availability */}
            <div className="form-control">
              <label className="label">
                <span className="label-text"><strong>Visibility* </strong> </span>
              </label>
              <select
                name="availability"
                defaultValue={availability}
                className="select select-bordered w-full"
                required
              >
                <option value="Public">Public</option>
                <option value="Hidden">Hidden (Only visible to you)</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                className="input input-bordered w-full"
                placeholder="https://example.com/your-image.jpg"
              />
            </div>

            {/* User Info (read-only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold italic">Your Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName || ''}
                className="input input-bordered w-full bg-gray-100"
                readOnly
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold italic">Your Email</span>
              </label>
              <input
                type="email"
                value={user?.email || ''}
                className="input input-bordered w-full bg-gray-100"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Description (full width) */}
        <div className="form-control mt-6">
          <label className="label">
            
            <span className="label-text font-bold">Description*</span>
          </label>
          <textarea
            name="description"
            defaultValue={description}
            className="textarea textarea-bordered h-auto w-full"
            placeholder="Share your detailed tips and methods..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-8">
          <button type="submit" className="btn rounded-lg  bg-gradient-to-r from-red-500 via-green-500 to-blue-500  border-2 w-full">
            Update Tip
          </button>
        </div>
      </form>
    </div>
    );
};

export default Update;