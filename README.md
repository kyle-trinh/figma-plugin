# Approach taken

- Based on the requirement, I initially thought that the plugin's functionality was to statically replace all the sample original text to the sample expected text: [Take Action, Elements, Nava Tiles list #1] -> [Button, Elements / Service Tiles / List Item ]. However, after brainstorming for a while, it would not be as usable for the user. I decided to take a more dynamic approach, which allows the user to choose the original text and the expected text
- I have several other ideas:
  - User selects 1 component, we find all the components with that name, then replace the name with the expected name of user's choice
  - Users are presented with a Original Name and a Expected Name input, then after clicking "Submit", all occurences of the Original Name will be replaced with the ExpectedName
  - User selects multiple components with different names, then are presented with the coresponding input fields for each selected component, then the user can enter the expected name for each selected component and click "Submit". After that, all selected components will have their names changed
  - ... And so on
- After thinking about it for a while, and putting myself in user's shoes, I decided the best approach would be:
  - Select a layer.
  - Run the plugin, which presents a form for "Original Name" and "Expected Name." "Original Name" is automatically populated based on the selected component's name.
  - All components with the same name are automatically selected on Figma's screen, enabling easy verification of changes.
  - Users can customize the "Original Name" to match multiple components, if needed.
  - Users enter the "Expected Name" and click "Submit," resulting in all components with the "Original Name" being changed to the "Expected Name."
- I came up with this approach because the more I read the requirement, the more I think it resembles the Find functionality of text editor. So, I thought of replicating some of its functionalities
- This approach gives the user the dynamic feature that they want, also the user can visually verify the change has taken place, because all the components are selected, and it's easy to see without having to LOOK FOR IT!

# Future Iteration

- Plan to implement advanced search capabilities by allowing users to use regex patterns, making searches even more dynamic.
- Consider adding options for "Match Case Sensitive," "Start With," "End With," and other search functionalities.
- Display the total number of results that match the search on the modal, providing users with a comprehensive overview of the currently selected components.
- Enhance user experience by allowing users to step through each selected component from the modal screen, similar to the Find functionality in text editors.
- Currently, the plugin can only be executed on a single page for performance reasons. In future iterations, optimize the code to support changes across multiple pages, ensuring greater versatility.
- Handle errors when the user runs the plugin, the modal is opened, but then the user selects "None". Currently, we're not able to handle this error

# Demo
https://drive.google.com/file/d/1tZHXZuZglC1YGASM1xVPRpr6X5cDSQxJ/view?usp=sharing
