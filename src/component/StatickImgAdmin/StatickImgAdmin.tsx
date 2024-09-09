import { adminImgs } from "../../types/adminImgType";
import { Link } from "react-router-dom";

function StatickImgAdmin({ images }: adminImgs) {
  return (
    <div>
      {images &&
        images.map((item) => (
          <div key={item.picture_id || item.full_picture_id}>
            {item.picture_id ? (
              <div>
                <p>Новые</p>
                <Link to={`new/${item.picture_id}`}>
                  {item.picture_id}
                </Link>
              </div>
            ) : (
              <div>
                <p>Старые</p>
                <Link to={`old/${item.full_picture_id}`}>
                  {item.full_picture_id}
                </Link>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default StatickImgAdmin;
