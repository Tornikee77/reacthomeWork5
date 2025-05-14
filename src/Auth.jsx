import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(4, "Username min 4 symbol"),
  surname: z.string().min(4, "Surname min 4 symbol"),
  email: z
    .string()
    .min(4, "Email min 4 symbol")
    .email("Incorrect format")
    .refine((value) => value !== "admin@gmail.com", {
      message: "Reserved Email",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const handleForm = async (data) => {
    fetch("https://68175c8026a599ae7c3a2220.mockapi.io/feedbacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((responseData) => {
        localStorage.setItem("userData", JSON.stringify(data));
      })
      .catch((errors) => {
        console.log(errors);
        setError("root", {
          message: "Something went wrong",
        });
      });
  };

  return (
    <div className="flex justify-center items-center gap-[71px] bg-[#0a0d17] min-h-screen">
      <form
        className="flex flex-col justify-center items-center bg-[#0A0D170D] p-6 rounded w-[506px] h-[536px]"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <div className="flex flex-col gap-10px mb-[41px] logindTitles">
          <h2 className="mb-4 w-[426px] font-[600] text-[30px] text-white">
            Let’s connect constellations
          </h2>
          <p className="w-[400px] text-white">
            Let's align our constellations! Reach out and let the magic of
            collaboration illuminate our skies.
          </p>
        </div>
        <div className="flex gap-[14px] nameAndSurname">
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700 text-sm"
              htmlFor="firstname"
            ></label>
            <input
              type="text"
              placeholder="your name"
              id="firstname"
              className="shadow px-3 py-2 border border-[#FFFFFF33] rounded outline-none w-full text-[#FFFFFF99]"
              {...register("username")}
            />
            <p className="text-red-500 text-xs italic">
              {errors.username && <pan>{errors.username.message}</pan>}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700 text-sm"
              htmlFor="surname"
            ></label>
            <input
              type="text"
              placeholder="your surname"
              id="surname"
              className="shadow px-3 py-2 border border-[#FFFFFF33] rounded outline-none w-full text-[#FFFFFF99]"
              {...register("surname")}
            />
            <p className="text-red-500 text-xs italic">
              {errors.surname && <pan>{errors.surname.message}</pan>}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-700 text-sm"
            htmlFor="surname"
          ></label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="px-3 py-2 border border-[#FFFFFF33] rounded outline-none w-[433px] text-[#FFFFFF99]"
            {...register("email")}
          />
          <p className="text-red-500 text-xs italic">
            {errors.email && <pan>{errors.email.message}</pan>}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-gray-700 text-sm"
            htmlFor="firstname"
          ></label>
          <input
            type="password"
            placeholder="Password"
            id="firstname"
            className="px-3 py-2 border border-[#FFFFFF33] rounded outline-none w-[433px] text-[#FFFFFF99]"
            {...register("password")}
          />
          <p className="text-red-500 text-xs italic">
            {errors.username && <pan>{errors.username.message}</pan>}
          </p>
        </div>
        <div>
          <input
            classname="px-3 py-2 border border-[#FFFFFF33] rounded outline-none w-[433px] text-[#FFFFFF99] "
            type="textarea"
            placeholder="message"
            {...register("textarea")}
          />
        </div>

        <button
          disabled={isSubmitting}
          className="bg-[#763AF5] mt-[14px] px-4 py-2 rounded w-[428px] text-[white] cursor-pointer"
          type="submit"
        >
          {isSubmitting ? "Sending.." : "Create Account"}
        </button>

        <div>{errors.root && <p>{errors.root.message}</p>}</div>
      </form>
      <div>
        <img
          className="w-[516px] h-[536px]"
          src="./images/astronaut.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Auth;
