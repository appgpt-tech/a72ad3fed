import {
  Datagrid,
  List,
  EditButton,
  Edit,
  SimpleForm,
  Create,
  SelectColumnsButton,
  DatagridConfigurable,
  TopToolbar,
  CreateButton,
  ExportButton,
  FilterButton,
  //Field controls
  BooleanField,
  DateField,
  EmailField,
  ImageField,
  NumberField,
  ReferenceField,
  TextField,
  UrlField,
  //Input controls
  BooleanInput,
  DateInput,
  EmailInput,
  ImageInput,
  NumberInput,
  ReferenceInput,
  TextInput,
  UrlInput,
  PasswordInput
} from "react-admin";
import { useRecordContext } from "react-admin";
import { Grid } from '@mui/material';
const ReadOnlyPasswordField = ({ record, source }) => {

  // You can customize the way you display the password here, e.g., mask it with asterisks
  const maskedPassword =  '********';

  return (
      <span>{maskedPassword}</span>
  );
};
const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
        <ExportButton />
        <SelectColumnsButton />
    </TopToolbar>
);
const MicrosoftExcelTitle = () => {
  const record = useRecordContext();
  return <span>MicrosoftExcel {record ? `"${ record.title }"` : ""}</span>;
};

export const MicrosoftExcelList = () => (
      <List actions={<ListActions  />} filters={ResourceFilters} >
        <DatagridConfigurable>
          <TextField source="title" />

<NumberField source="price" />
<NumberField source="duration" />
<TextField source="exercises" /><EditButton />

        </DatagridConfigurable>
      </List>
      );

export const MicrosoftExcelEdit = () => (
                    <Edit title={<MicrosoftExcelTitle />}>
                      <SimpleForm>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
                          <Grid item xs={4}>
<TextInput source="title"   /></Grid>
<Grid item xs={4}>
<TextInput source="description"   /></Grid>
<Grid item xs={4}>
<NumberInput source="price"   /></Grid>
<Grid item xs={4}>
<NumberInput source="duration"   /></Grid>
<Grid item xs={4}>
<TextInput source="exercises"   /></Grid>
                        </Grid>
                      </SimpleForm>
                    </Edit>
                  );

export const MicrosoftExcelCreate = () => (
                                  <Create>
                                    <SimpleForm>
                                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
                                        <Grid item xs={4}>
<TextInput source="title"   /></Grid>
<Grid item xs={4}>
<TextInput source="description"   /></Grid>
<Grid item xs={4}>
<NumberInput source="price"   /></Grid>
<Grid item xs={4}>
<NumberInput source="duration"   /></Grid>
<Grid item xs={4}>
<TextInput source="exercises"   /></Grid>
                                      </Grid>
                                    </SimpleForm>
                                  </Create>
                                );

const ResourceFilters = [
      <TextInput source="q" label="Search" alwaysOn />,
,
,
,
,
,

    ];


