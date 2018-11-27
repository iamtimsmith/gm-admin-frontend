import React from "react";
import Image from "../../images/pexels-photo-14303.jpeg";

const DeleteAccount = () => (
  <div className="delete-account">
    <h1>Delete Your Account</h1>
    <img src={Image} alt="Delete your account" />
    <p>
      We're really sad to see you go! Just one quick note: This cannot be
      undone. If you delete your account, you won't be able to access any of
      your notes.{" "}
    </p>
    <br />
    <p>
      You can always create a new account, but you'll lose access to all of your
      awesome stuff.
    </p>
    <p>
      <button onClick={() => this.props.onDelete()}>
        Delete your account forever
      </button>
    </p>
  </div>
);

export default DeleteAccount;
