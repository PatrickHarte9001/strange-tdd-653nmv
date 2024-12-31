const Profile = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="w-12 h-12 rounded-full border border-1 border-dark-lightened dark:border-light-darkened bg-white"
    >
      <path
        d="M10,100 a1,1 0 0,1 80,0"
        fill="#888888"
        stroke="#242424"
        strokeWidth="3"
      />
      <circle
        cx="50"
        cy="50"
        r="25"
        fill="#888888"
        stroke="#242424"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Profile;
