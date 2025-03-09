import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { defaultPermissions } from "../../store/constants/roles";
import { Roles } from "../../store/zustand/RolesActionsStore";
const permissionsList = ["users", "companies", "roles", "blogs"] as const;

const RolePermissionTable = ({
  roles,
  roleName,
  handlePermissionChange,
}: {
  roles: Roles;
  roleName: string;
  handlePermissionChange: (
    roleName: string,
    category: keyof typeof defaultPermissions,
    permissionType: "read" | "read_write"
  ) => void;
}) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <strong>Permissions</strong>
            </TableCell>
            {permissionsList.map((perm) => (
              <TableCell key={perm} align="center">
                {perm.charAt(0).toUpperCase() + perm.slice(1)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Read</strong>
            </TableCell>
            {permissionsList.map((category) => (
              <TableCell key={category} align="center">
                <Checkbox
                  checked={roles[roleName][category].read}
                  {...(category === "roles" || roleName === "Admin"
                    ? { disabled: true }
                    : {})}
                  onChange={() =>
                    handlePermissionChange(roleName, category, "read")
                  }
                />
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>Read & Write</strong>
            </TableCell>
            {permissionsList.map((category) => (
              <TableCell key={category} align="center">
                <Checkbox
                  checked={roles[roleName][category].read_write}
                  {...(roleName === "Admin" ? { disabled: true } : {})}
                  onChange={() =>
                    handlePermissionChange(roleName, category, "read_write")
                  }
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RolePermissionTable;
