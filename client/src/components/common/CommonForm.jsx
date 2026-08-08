import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "../ui/select";
import { Textarea } from "../ui/textarea";

function CommonForm({
    formControls,
    onSubmit,
    formData,
    setFormData,
    buttonText,
    isBtnDisabled
}) {

    function renderInputsByComponentType(controlItem) {
      let element;
      const value = formData?.[controlItem.name] || "";
      switch (controlItem.componentType) {
        case "input":
          element = (
            <Input
              id={controlItem.name}
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              type={controlItem.type}
              value={value}
              onChange={(event) => setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              }
              )}
            />
          );
          break;
        case "select":
          element = (
            /* FIX 2: Fixed opening tag wrapper and closed it properly */
            <Select 
              value={value}
              /* FIX 3: Extracted raw value string, not event object */
              onValueChange={(value) => setFormData({
                  ...formData,
                  [controlItem.name]: value
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={controlItem.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {controlItem.options && controlItem.options.length > 0
                  ? controlItem.options.map((optionItem) => (
                      <SelectItem key={optionItem.id} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem> ))
                  : null}
              </SelectContent>
            </Select>
          );
          break;
        case "textarea":
          element = (
            <Textarea
              value={value}
              onChange={(event) => setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              }
              )}
              id={controlItem.name}
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              type={controlItem.type}
            />
          );
          break;
        default:
          element = (
            <Input
              value={value}
              onChange={(event) => setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              }
              )}
              id={controlItem.name}
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              type={controlItem.type}
            />
          );
          break;
      }
      return element;
    }
    return ( 
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map((controlItem) => 
                        <div key={controlItem.name} className="grid w-full gap-2">
                            <Label className="mb-1">{controlItem.label}</Label>
                            {
                                renderInputsByComponentType(controlItem)
                            }
                        </div>
                    )
                }
            </div> 
            <div className="flex justify-center">
            <Button disabled={isBtnDisabled} className="mt-2 w-fit">
                {buttonText || 'Submit'}
            </Button>
            </div>
        </form>
     );
}

export  {CommonForm};