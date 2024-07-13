type TProductParameter<T> = {
   id: UUID;
   label: string;
   extraPrice?: number;
   fieldType: EParameterType;
   additionalInfo: T;
};

type TNullableParameter = null;

type TColorParameter = {
   colors: string[];
   defaultColor?: string;
};

type TToggleParameter = {
   defaultChecked: boolean;
};

type TInputParameter = {
   defaultValue: string;
   unit?: string;
};

type TCounterParameter = {
   defaultValue: number;
   unit?: string;
   step?: number;
};
