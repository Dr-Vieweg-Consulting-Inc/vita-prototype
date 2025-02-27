// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// interface Entity {
//   id: number;
//   name: string;
//   type: string;
//   industry: string;
//   country: string;
//   contact_email: string;
// }

// const EntityConfig: React.FC = () => {
//   const [entities, setEntities] = useState<Entity[]>([]);
//   const [newEntity, setNewEntity] = useState<Omit<Entity, "id">>({
//     name: "",
//     type: "",
//     industry: "",
//     country: "",
//     contact_email: "",
//   });

//   const handleAddEntity = () => {
//     if (!newEntity.name || !newEntity.type || !newEntity.contact_email) return;
//     setEntities([...entities, { id: entities.length + 1, ...newEntity }]);
//     setNewEntity({
//       name: "",
//       type: "",
//       industry: "",
//       country: "",
//       contact_email: "",
//     });
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Entity Configuration
//       </Typography>
//       <Typography variant="h6">Add New Entity</Typography>
//       <TextField
//         label="Name"
//         fullWidth
//         value={newEntity.name}
//         onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
//         margin="normal"
//       />
//       <TextField
//         label="Type"
//         fullWidth
//         value={newEntity.type}
//         onChange={(e) => setNewEntity({ ...newEntity, type: e.target.value })}
//         margin="normal"
//       />
//       <TextField
//         label="Industry"
//         fullWidth
//         value={newEntity.industry}
//         onChange={(e) =>
//           setNewEntity({ ...newEntity, industry: e.target.value })
//         }
//         margin="normal"
//       />
//       <TextField
//         label="Country"
//         fullWidth
//         value={newEntity.country}
//         onChange={(e) =>
//           setNewEntity({ ...newEntity, country: e.target.value })
//         }
//         margin="normal"
//       />
//       <TextField
//         label="Contact Email"
//         fullWidth
//         value={newEntity.contact_email}
//         onChange={(e) =>
//           setNewEntity({ ...newEntity, contact_email: e.target.value })
//         }
//         margin="normal"
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAddEntity}
//         sx={{ mt: 2 }}
//       >
//         Add Entity
//       </Button>

//       <Typography variant="h6" sx={{ mt: 4 }}>
//         Existing Entities
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Industry</TableCell>
//               <TableCell>Country</TableCell>
//               <TableCell>Contact Email</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {entities.map((entity) => (
//               <TableRow key={entity.id}>
//                 <TableCell>{entity.name}</TableCell>
//                 <TableCell>{entity.type}</TableCell>
//                 <TableCell>{entity.industry}</TableCell>
//                 <TableCell>{entity.country}</TableCell>
//                 <TableCell>{entity.contact_email}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default EntityConfig;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, addEntity } from "../../reducer";
// import { addEntity } from "../redux/actions";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const EntityConfig: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const entities = useSelector((state: RootState) => state.entities);
  const [newEntity, setNewEntity] = React.useState({
    name: "",
    type: "",
    industry: "",
    country: "",
    contact_email: "",
  });

  const handleAddEntity = () => {
    if (!newEntity.name || !newEntity.type || !newEntity.contact_email) return;
    dispatch(addEntity({ id: entities.length + 1, ...newEntity }));
    setNewEntity({
      name: "",
      type: "",
      industry: "",
      country: "",
      contact_email: "",
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Entity Configuration
      </Typography>
      <Typography variant="h6">Add New Entity</Typography>
      <TextField
        label="Name"
        fullWidth
        value={newEntity.name}
        onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Type"
        fullWidth
        value={newEntity.type}
        onChange={(e) => setNewEntity({ ...newEntity, type: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Industry"
        fullWidth
        value={newEntity.industry}
        onChange={(e) =>
          setNewEntity({ ...newEntity, industry: e.target.value })
        }
        margin="normal"
      />
      <TextField
        label="Country"
        fullWidth
        value={newEntity.country}
        onChange={(e) =>
          setNewEntity({ ...newEntity, country: e.target.value })
        }
        margin="normal"
      />
      <TextField
        label="Contact Email"
        fullWidth
        value={newEntity.contact_email}
        onChange={(e) =>
          setNewEntity({ ...newEntity, contact_email: e.target.value })
        }
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEntity}
        sx={{ mt: 2 }}
      >
        Add Entity
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Existing Entities
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Contact Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell>{entity.name}</TableCell>
                <TableCell>{entity.type}</TableCell>
                <TableCell>{entity.industry}</TableCell>
                <TableCell>{entity.country}</TableCell>
                <TableCell>{entity.contact_email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EntityConfig;
