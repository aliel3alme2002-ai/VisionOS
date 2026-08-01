# VisionOS Core Domain Model Specification

This specification documents the 14 fundamental business entities that define the VisionOS hybrid edge-cloud domain.

---

## 1. Tenant

### Description
The **Tenant** is the top-level organizational entity representing a commercial customer, enterprise enterprise account, or resort operator. It acts as the primary boundary for data isolation, security, billing, and resource provisioning.

### Responsibilities
* Enforces strict multi-tenant data isolation across all cloud services and storage layers.
* Owns all physical sites, user identities, licenses, and configuration rules.
* Serves as the billing and entitlement boundary.

### Properties
* `tenant_id`: Unique global identifier.
* `name`: Legal or display name of the tenant organization.
* `code`: Human-readable unique code assigned to the organization.
* `status`: Active, Suspended, Provisioning, or Terminated.
* `contact_email`: Primary administrative contact email.
* `created_at` / `updated_at`: Audit timestamps.

### Relationships
* **1-to-Many** with `User` (A Tenant employs multiple Users).
* **1-to-Many** with `Site` (A Tenant operates multiple physical Sites).
* **1-to-Many** with `License` (A Tenant holds one or more feature entitlements/licenses).

### Future Extensibility
* Multi-region cloud routing attributes.
* Sub-tenant hierarchy support for corporate conglomerates and regional brand management.

---

## 2. User

### Description
A **User** represents a human actor or system identity within a Tenant, such as a security director, facility manager, system administrator, or dashboard viewer.

### Responsibilities
* Authenticates against VisionOS authentication services via credentials or SSO.
* Inherits Role-Based Access Control (RBAC) permissions.
* Receives alerts and notifications based on personal communication preferences.

### Properties
* `user_id`: Unique global identifier.
* `tenant_id`: Reference to owning Tenant.
* `email`: Primary authentication identity and email address.
* `full_name`: User's full name.
* `role`: RBAC role string (`SuperAdmin`, `TenantAdmin`, `Operator`, `Viewer`).
* `phone_number`: Phone number for SMS / voice alert routing.
* `status`: Active, Inactive, or Locked.

### Relationships
* **Many-to-1** with `Tenant` (Belongs to exactly one Tenant).
* **Many-to-Many** with `Site` (May be assigned operational scope to specific Sites).
* **1-to-Many** with `Notification` (Receives individual notification dispatches).

### Future Extensibility
* OAuth2 / SAML / OIDC federated identity providers.
* Shift-based duty schedules and escalation delegation rules.

---

## 3. Site

### Description
A **Site** represents a physical geographic facility or property owned by a Tenant (e.g. "Grand Hotel Resort", "Logistics Warehouse Complex #4").

### Responsibilities
* Groups physical structures, hardware devices, and edge compute nodes.
* Defines geographic location attributes (GPS coordinates, address).
* Serves as an operational filter for live dashboards and safety monitoring feeds.

### Properties
* `site_id`: Unique global identifier.
* `tenant_id`: Reference to owning Tenant.
* `name`: Facility display name.
* `address`: Physical postal address.
* `latitude` / `longitude`: Geographic coordinates.
* `timezone`: Canonical IANA timezone identifier (e.g. `UTC`, `America/New_York`).

### Relationships
* **Many-to-1** with `Tenant` (Belongs to one Tenant).
* **1-to-Many** with `Building` (Contains one or more Buildings).
* **1-to-Many** with `Edge Box` (Hosts one or more on-premise Edge Boxes).

### Future Extensibility
* Geofenced perimeter boundaries.
* Weather integration service bindings for environmental context.

---

## 4. Building

### Description
A **Building** represents a specific physical architectural structure located within a Site (e.g. "Main Hotel Tower", "Pool Complex", "South Parking Garage").

### Responsibilities
* Provides mid-level spatial categorization within a Site.
* Aggregates floors, rooms, and localized hardware assets.

### Properties
* `building_id`: Unique global identifier.
* `site_id`: Reference to parent Site.
* `tenant_id`: Reference to owning Tenant.
* `name`: Building name or designation.
* `code`: Building reference code.

### Relationships
* **Many-to-1** with `Site` (Located within one Site).
* **1-to-Many** with `Floor` (Partitioned into one or more Floors).

### Future Extensibility
* 3D spatial model asset URL (BIM / IFC / CAD format).

---

## 5. Floor

### Description
A **Floor** represents a horizontal level, story, or elevation deck within a Building (e.g. "Ground Floor", "Roof Deck", "Basement B2").

### Responsibilities
* Provides spatial positioning context for camera placements.
* Holds floorplan image assets used for dashboard overlay rendering.

### Properties
* `floor_id`: Unique global identifier.
* `building_id`: Reference to parent Building.
* `tenant_id`: Reference to owning Tenant.
* `name`: Floor display name.
* `level_number`: Integer elevation index (e.g. 0 for Ground, -1 for Basement).
* `floorplan_url`: Link to 2D architectural layout image asset.

### Relationships
* **Many-to-1** with `Building` (Belongs to one Building).
* **1-to-Many** with `Zone` (Partitioned into operational Zones).

### Future Extensibility
* Dynamic heat-map visualization layer coordinates.

---

## 6. Zone

### Description
A **Zone** represents a bounded physical or virtual Region of Interest (ROI) monitored by vision rules (e.g. "Children's Deep Water Area", "Restricted Perimeter Fence", "Loading Dock Bay 3").

### Responsibilities
* Defines polygon ROI spatial coordinates relative to camera frame dimensions or physical maps.
* Serves as the spatial target for safety policy rules (Occupancy, Intrusion, Drowning).

### Properties
* `zone_id`: Unique global identifier.
* `floor_id`: Optional reference to parent Floor.
* `camera_id`: Reference to primary monitoring Camera.
* `tenant_id`: Reference to owning Tenant.
* `name`: Zone descriptive name.
* `zone_type`: Category (`POOL`, `PERIMETER`, `OCCUPANCY`, `FENCE`).
* `coordinates`: Bounding polygon vertex array (`[{x, y}, ...]`).

### Relationships
* **Many-to-1** with `Camera` (Monitored by a specific Camera feed).
* **Many-to-1** with `Floor` (Optionally associated with a physical Floor).
* **1-to-Many** with `Rule` (Target of automated evaluation rules).
* **1-to-Many** with `Event` (Location tag for captured vision events).

### Future Extensibility
* 3D volumetric bounding box coordinates (x, y, z, depth).

---

## 7. Camera

### Description
A **Camera** represents a physical IP video camera hardware stream ingested by the VisionOS Edge Box.

### Responsibilities
* Ingests high-definition RTSP video feeds into Frigate NVR.
* Manages stream parameters (resolution, FPS, ONVIF credentials, PTZ capability).
* Provides frame snapshots and WebRTC stream URLs for client dashboards.

### Properties
* `camera_id`: Unique global identifier.
* `edge_box_id`: Reference to processing Edge Box.
* `tenant_id`: Reference to owning Tenant.
* `name`: Camera descriptive label (e.g. "Pool Deep End North").
* `rtsp_url`: Secure RTSP stream connection URI.
* `onvif_host`: IP address for ONVIF protocol discovery.
* `status`: Active, Offline, or Error.
* `resolution`: Video stream resolution string (e.g. `1920x1080`).
* `fps`: Stream frames per second.

### Relationships
* **Many-to-1** with `Edge Box` (Ingested and processed by one Edge Box).
* **1-to-Many** with `Zone` (Contains one or more ROI Zones).
* **1-to-Many** with `Event` (Generates raw computer vision Events).

### Future Extensibility
* Thermal stream metadata channels and pan-tilt-zoom preset presets.

---

## 8. Device

### Description
A **Device** represents a physical peripheral IoT hardware component connected to an Edge Box, such as physical alarm sirens, strobe relays, GPIO controllers, or external sensors.

### Responsibilities
* Executes immediate sub-100ms hardware alarm actions (e.g. flashing strobe, sounding siren relay).
* Collects peripheral telemetry state (e.g. door contact sensors, panic buttons).

### Properties
* `device_id`: Unique global identifier.
* `edge_box_id`: Reference to managing Edge Box.
* `tenant_id`: Reference to owning Tenant.
* `name`: Device display label.
* `device_type`: Category (`ALARM_SIREN`, `STROBE_LIGHT`, `GPIO_RELAY`, `PANIC_BUTTON`).
* `connection_type`: Protocol (`MQTT`, `GPIO`, `MODBUS`, `NETWORK`).
* `status`: Online, Offline, or Triggered.

### Relationships
* **Many-to-1** with `Edge Box` (Connected to and managed by one Edge Box).
* **1-to-Many** with `Alert` (Target of physical alarm dispatch actions).

### Future Extensibility
* Two-way audio speaker broadcast relay.

---

## 9. Edge Box

### Description
An **Edge Box** represents the physical on-premise hardware compute server deployed at a Customer Site. It executes Frigate NVR, hardware AI accelerators, local MQTT event streaming, and local rule evaluation.

### Responsibilities
* Ingests local RTSP camera feeds and executes pixel motion gating.
* Runs local deep learning inference and custom safety AI modules.
* Dispatches sub-second local physical alarm triggers independently during cloud internet outages.
* Buffers historical metadata for cloud synchronization upon reconnect.

### Properties
* `edge_box_id`: Unique global identifier.
* `site_id`: Reference to parent Site.
* `tenant_id`: Reference to owning Tenant.
* `hardware_id`: Cryptographic HWID (CPU serial, MAC address hash, UUID).
* `name`: Server node hostname or label.
* `ip_address`: Local LAN IP address.
* `status`: Online, Offline, Degraded.
* `last_heartbeat`: Timestamp of last cloud communication check-in.
* `gpu_type`: Installed hardware accelerator (`NVIDIA_TENSORRT`, `INTEL_OPENVINO`, `CORAL_TPU`, `CPU`).

### Relationships
* **Many-to-1** with `Site` (Deployed at one Site facility).
* **1-to-Many** with `Camera` (Ingests feeds from multiple Cameras).
* **1-to-Many** with `Device` (Controls peripheral IoT Devices).

### Future Extensibility
* High-Availability (HA) failover edge clustering.

---

## 10. Event

### Description
An **Event** represents an atomic observation captured by computer vision inference engines or hardware sensors (e.g. `person` detected in Zone A with `confidence: 0.94`, or `drowning_motion_profile` identified).

### Responsibilities
* Records raw observation data, timestamps, bounding box coordinates, and confidence scores.
* Acts as raw input data evaluated by the Rule Engine.

### Properties
* `event_id`: Unique global identifier.
* `camera_id`: Reference to source Camera.
* `zone_id`: Optional reference to affected Zone.
* `tenant_id`: Reference to owning Tenant.
* `event_type`: Detection type (`PERSON`, `VEHICLE`, `INTRUSION`, `DROWNING_ALERT`, `OCCUPANCY_COUNT`).
* `confidence`: AI detection score float (`0.00` to `1.00`).
* `bounding_box`: Normalised box coordinates (`[x_min, y_min, x_max, y_max]`).
* `snapshot_url`: Image frame clip URI.
* `timestamp`: Precise UTC timestamp of observation.

### Relationships
* **Many-to-1** with `Camera` (Captured by one Camera).
* **Many-to-1** with `Zone` (Occurs within one Zone).
* **1-to-1 or 1-to-Many** with `Alert` (Triggers an Alert when rule conditions match).

### Future Extensibility
* Vector embedding vector storage for multi-camera re-identification (ReID).

---

## 11. Alert

### Description
An **Alert** represents an evaluated, actionable incident requiring human intervention or automated safety dispatch (e.g. "Drowning Danger in Pool Zone", "Perimeter Security Breach").

### Responsibilities
* Represents confirmed incident state requiring acknowledgment or resolution.
* Initiates local physical siren triggers and multi-channel notification dispatches.

### Properties
* `alert_id`: Unique global identifier.
* `event_id`: Reference to triggering Event.
* `rule_id`: Reference to evaluated Rule.
* `tenant_id`: Reference to owning Tenant.
* `severity`: Alert level (`INFO`, `WARNING`, `CRITICAL`, `LIFE_SAFETY`).
* `status`: Active, Acknowledged, Dismissed, Resolved.
* `acknowledged_by`: Reference to User who acknowledged the alert.
* `created_at` / `resolved_at`: Incident lifecycle timestamps.

### Relationships
* **Many-to-1** with `Event` (Derived from a triggering Event).
* **Many-to-1** with `Rule` (Generated by matching a Rule).
* **1-to-Many** with `Notification` (Dispatches multi-channel Notifications).

### Future Extensibility
* Incident workflow audit logs and SLA resolution timers.

---

## 12. Rule

### Description
A **Rule** represents a user-configured policy defining threshold conditions, spatial targets, and actions (e.g. "If `person` in `Pool Zone` remains static > 15 seconds, trigger `LIFE_SAFETY` alert").

### Responsibilities
* Evaluates real-time event streams against operational logic operators (`>`, `<`, `==`, `DURATION_EXCEEDS`).
* Controls event deduplication and alert debouncing timers.

### Properties
* `rule_id`: Unique global identifier.
* `tenant_id`: Reference to owning Tenant.
* `zone_id`: Target Zone for rule evaluation.
* `name`: Rule label.
* `metric`: Evaluated metric (`occupancy_count`, `dwell_time`, `drowning_risk_score`).
* `operator`: Comparison operator (`GREATER_THAN`, `EQUALS`, `DURATION_EXCEEDS`).
* `threshold_value`: Threshold numerical or string value.
* `debounce_seconds`: Cooldown window preventing duplicate alerts.
* `is_enabled`: Boolean flag toggling rule evaluation.

### Relationships
* **Many-to-1** with `Zone` (Applies to a specific Zone).
* **1-to-Many** with `Alert` (Generates Alerts when triggered).

### Future Extensibility
* Compound multi-camera composite rule chains.

---

## 13. Notification

### Description
A **Notification** represents an individual message delivery attempt dispatched over a communication channel (WebSocket, SMS, Email, Push) to notify users of an Alert.

### Responsibilities
* Formats alert payloads into channel-specific message templates.
* Tracks delivery status (Pending, Sent, Failed) and retries.

### Properties
* `notification_id`: Unique global identifier.
* `alert_id`: Reference to source Alert.
* `user_id`: Reference to recipient User.
* `tenant_id`: Reference to owning Tenant.
* `channel`: Delivery medium (`WEBSOCKET`, `SMS`, `EMAIL`, `PUSH`, `TELEGRAM`).
* `status`: Pending, Sent, Failed, Delivered.
* `sent_at`: Delivery timestamp.
* `error_message`: Diagnostic string if dispatch failed.

### Relationships
* **Many-to-1** with `Alert` (Dispatched for a specific Alert).
* **Many-to-1** with `User` (Addressed to a specific recipient User).

### Future Extensibility
* Escalation fallback chains (e.g. SMS fallback if WebSocket unacknowledged after 30 seconds).

---

## 14. License

### Description
A **License** represents a cryptographically signed software entitlement key governing a Tenant's feature flags, maximum camera stream quotas, and hardware bindings.

### Responsibilities
* Enforces operational limits (maximum camera count, active module entitlements).
* Binds software execution to specific Edge Box hardware serial numbers (HWID).

### Properties
* `license_id`: Unique global identifier.
* `tenant_id`: Reference to entitled Tenant.
* `license_key`: Cryptographically signed RSA-4096 signature token string.
* `max_cameras`: Permitted maximum active camera limit.
* `enabled_modules`: Module flag array (`["POOL_SAFETY", "INTRUSION", "OCCUPANCY", "LPR"]`).
* `expires_at`: Entitlement expiration timestamp.
* `status`: Active, Expired, Revoked.

### Relationships
* **Many-to-1** with `Tenant` (Entitles a specific Tenant).
* **1-to-Many** with `Edge Box` (Enforced on registered Edge Boxes).

### Future Extensibility
* Usage-based billing telemetry reporting bindings.
