import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './Context/AuthProvider';

const AddPlant = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const tipData = Object.fromEntries(formData.entries());

    // Add user info automatically
    tipData.userName = user.displayName;
    tipData.userEmail = user.email;

    fetch('https://a10server.vercel.app/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tipData),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
       
        if (data.insertedId || data._id || data.id) {
          Swal.fire({
            title: 'Success!',
            text: 'Plant tip added successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          form.reset();
        } else {
          Swal.fire({
            title: 'Warning!',
            text: 'Tip was added, but no ID was returned.',
            icon: 'warning',
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
        });
      });
  };

  return (
    <div className="mx-10 my-15">
      <div>
        <h1 className="text-4xl font-bold text-indigo-800 italic text-center">Share Garden Tip</h1>
        <p className="text-center my-5">
          Share your gardening knowledge with the community
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title*</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="e.g., How I Grow Tomatoes Indoors"
                required
              />
            </div>

            {/* Plant Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Plant Type/Topic*</span>
              </label>
              <input
                type="text"
                name="plantType"
                className="input input-bordered w-full"
                placeholder="e.g., Tomatoes, Roses, Soil"
                required
              />
            </div>

            {/* Difficulty Level */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Difficulty Level*</span>
              </label>
              <select
                name="difficulty"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                name="category"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select category</option>
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
                <span className="label-text">Visibility*</span>
              </label>
              <select
                name="availability"
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
                <span className="label-text">Image URL</span>
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
                <span className="label-text">Your Name</span>
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
                <span className="label-text">Your Email</span>
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
            <span className="label-text">Description*</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered h-auto w-full"
            placeholder="Share your detailed tips and methods..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-8">
          <button type="submit" className="btn bg-gradient-to-r from-green-400 via-sky-400 to-pink-500 dark:bg-gray-900 border-2 w-full">
            Share Tip
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlant;