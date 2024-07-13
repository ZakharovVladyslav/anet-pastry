type TMilestone = {
   label: string;
};

type TMilestoneSize = 'm';
type TMilestoneVariant = 'primary';

type TMilestoneProps = {
   milestones: TMilestone[];
   activeMilestone?: number;
   size?: TMilestoneSize;
   variant?: TMilestoneVariant;
   completed?: boolean;
   onMilestoneChange: (index: number) => void;
};
