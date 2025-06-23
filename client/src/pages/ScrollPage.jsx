import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const materials = [
  {
    category: "Plastic",
    items: [
      {
        name: "PET Bottles",
        image:
          "https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_790(1).jpg",
        recycledProducts: [
          {
            name: "Recycled Plastic Bottles",
            description: "Melted and remolded into new bottles and containers.",
          },
          {
            name: "Polyester Fabric",
            description: "Processed into fibers for clothing and textiles.",
          },
          {
            name: "Plastic Lumber",
            description:
              "Converted into durable materials for outdoor furniture and decking.",
          },
        ],
      },
      {
        name: "Plastic Bags",
        image:
          "https://i.guim.co.uk/img/media/88e31ffdbd4f105b04e4a7a15164ee5b93fca74d/0_89_3500_2101/master/3500.jpg?width=1200&quality=85&auto=format&fit=max&s=03c0c18b9f1b8d9021f4854efac35a24",
        recycledProducts: [
          {
            name: "Reprocessed Plastic Film",
            description: "Used in new plastic bags and packaging materials.",
          },
          {
            name: "Composite Lumber",
            description: "Blended with wood to create sturdy composite boards.",
          },
          {
            name: "Road Materials",
            description: "Repurposed into asphalt for road construction.",
          },
        ],
      },
    ],
  },
  {
    category: "Cardboard",
    items: [
      {
        name: "Corrugated Cardboard",
        image:
          "https://www.cnet.com/a/img/resize/431b0045e976996c20c08dbc71db2eca6678cc70/hub/2024/08/31/046aed5a-4f23-4a7f-8bdc-7386ff74b736/stack-of-cardboard-boxesgettyimages-1211520930.jpg?auto=webp&fit=crop&height=675&width=1200",
        recycledProducts: [
          {
            name: "New Cardboard Boxes",
            description:
              "Recycled and reprocessed into fresh packaging materials.",
          },
          {
            name: "Paperboard",
            description:
              "Used to manufacture cereal boxes, shoe boxes, and more.",
          },
          {
            name: "Insulation",
            description: "Shredded and used for eco-friendly home insulation.",
          },
        ],
      },
    ],
  },
  {
    category: "Glass",
    items: [
      {
        name: "Glass Bottles",
        image:
          "https://media.istockphoto.com/id/509118539/photo/glass-manufacturer.jpg?s=612x612&w=0&k=20&c=duCInimcDNyhyCwOiuN7nrkEbdgWntZEUr_up-zKyZA=",
        recycledProducts: [
          {
            name: "New Glass Bottles",
            description:
              "Melted down and reshaped into fresh glass containers.",
          },
          {
            name: "Glass Tiles",
            description:
              "Crushed and reformed into decorative tiles for homes.",
          },
          {
            name: "Abrasives",
            description:
              "Used as a substitute for sand in industrial processes.",
          },
        ],
      },
    ],
  },
  {
    category: "Paper",
    items: [
      {
        name: "Newspapers",
        image:
          "https://www.rubicon.com/wp-content/uploads/2022/01/newspaper-bundles-for-paper-recycling.jpg",
        recycledProducts: [
          {
            name: "Recycled Paper",
            description:
              "Processed into fresh paper for printing and packaging.",
          },
          {
            name: "Egg Cartons",
            description: "Repurposed into molded pulp packaging.",
          },
          {
            name: "Insulation",
            description:
              "Used in the construction industry for soundproofing and insulation.",
          },
        ],
      },
    ],
  },
  {
    category: "Metal",
    items: [
      {
        name: "Aluminum Cans",
        image:
          "https://media.generalkinematics.com/wp-content/uploads/2023/04/iStock-491962627.jpg",
        recycledProducts: [
          {
            name: "New Aluminum Cans",
            description: "Melted and reshaped into fresh beverage cans.",
          },
          {
            name: "Automotive Parts",
            description: "Used in the production of car components.",
          },
          {
            name: "Bicycles",
            description: "Repurposed into lightweight bicycle frames.",
          },
        ],
      },
    ],
  },
];

const RecyclableMaterials = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        Recyclable Materials & Their Products
      </h1>
      {materials.map((category, index) => (
        <div key={index} className="mb-5">
          <h2 className="text-primary mb-3">{category.category}</h2>
          <div className="row">
            {category.items.map((item, idx) => (
              <div key={idx} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <ul className="list-group list-group-flush">
                      {item.recycledProducts.map((product, id) => (
                        <li key={id} className="list-group-item">
                          <strong>{product.name}:</strong> {product.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center gap-4 mt-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/camera")}
        >
          Scan Waste
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => navigate("/shop")}
        >
          Shop Recycled Products
        </button>
      </div>
    </div>
  );
};

export default RecyclableMaterials;
