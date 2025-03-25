import { useRouter } from 'next/router';

export default function UpdatePlansButton() {
  const router = useRouter();

  const handleUpdatePlans = () => {
    router.push('/plans');
  };

  return (
    <button 
      onClick={handleUpdatePlans} 
      className="w-full flex items-center justify-start gap-2 px-2 py-1.5 rounded"
    >
    <svg width="20px" height="20px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
        <path d="M20.75 3C21.0557 3 21.3421 3.13962 21.5303 3.3746L21.6048 3.48102L25.8548 10.481C26.0556 10.8118 26.0459 11.2249 25.8395 11.5435L25.7634 11.6459L14.7634 24.6459C14.3906 25.0865 13.7317 25.1159 13.3207 24.7341L13.2366 24.6459L2.23662 11.6459C1.98663 11.3505 1.93182 10.941 2.08605 10.5941L2.14522 10.481L6.39522 3.48102C6.55388 3.21969 6.82182 3.04741 7.1204 3.00842L7.25001 3H20.75ZM17.515 12H10.484L13.999 20.672L17.515 12ZM22.844 12H19.673L16.756 19.195L22.844 12ZM8.326 12H5.155L11.242 19.193L8.326 12ZM9.674 5H7.81101L4.775 10H8.245L9.674 5ZM16.246 5H11.753L10.324 10H17.675L16.246 5ZM20.188 5H18.325L19.754 10H23.224L20.188 5Z" fill="#000000"></path> </g>
    </svg>
      <span className="text-gray-800">Atualizar plano</span>
    </button>
  );
}