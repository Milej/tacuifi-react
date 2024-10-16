const Error404 = () => {
  return (
    <div className="grid gap-4 place-content-center text-center w-full h-screen">
      <h1 className="text-3xl font-bold">¡Error 404!</h1>
      <h2 className="text-xl font-semibold">Página no encontrada :(</h2>
      <button
        className="bg-green-400 hover:bg-green-500 text-white text-xl font-semibold p-5"
        onClick={() => history.back()}>
        Volver
      </button>
    </div>
  );
};
export default Error404;
