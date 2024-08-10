import Swal from "sweetalert2";

const SwalComponent = async (title, icon) => {
  await Swal.fire({
    title: title,
    icon: icon,
    toast: true,
    timer: 3000,
  });
};

export default SwalComponent;
