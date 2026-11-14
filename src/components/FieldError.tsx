/** Error text under a form field; the field points at it with aria-describedby. */
export function FieldError({ id, message }: { id: string; message?: string }) {
	if (!message) {
		return null;
	}
	return (
		<span className="field__error" id={id}>
			{message}
		</span>
	);
}
