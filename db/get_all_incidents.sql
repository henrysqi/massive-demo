SELECT 
	inc.id, 
	inc.us_state, 
	inj.name as injury, 
	a.name as affected_area,
	c.name as cause_name
FROM incidents inc
JOIN injuries inj 
	ON inc.injury_id = inj.id
JOIN affected_areas a 
	ON a.id = inj.affected_area_id
JOIN causes c
	ON c.id = inc.cause_id